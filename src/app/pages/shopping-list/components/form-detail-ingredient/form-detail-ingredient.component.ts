import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { debounce, debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ShoppingList } from 'src/app/core/model/shoppingList.model';

@Component({
  selector: 'app-form-detail-ingredient',
  templateUrl: './form-detail-ingredient.component.html',
  styleUrls: ['./form-detail-ingredient.component.scss'],
})
export class FormDetailIngredientComponent implements OnInit {
  addItemShoppingList!: FormGroup;
  inputIngredientName = new Subject<string>();
  isDuplicate: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<FormDetailIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.createForm();
    this.inputIngredientName
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((data: string) => {
        this.isDuplicate = (this.data?.listIngredient as ShoppingList[])?.some(
          (item: ShoppingList) => {
            return item.ingredientName.toLowerCase() == data.toLowerCase();
          }
        );
      });
  }

  ngOnInit(): void {
    this.addItemShoppingList.patchValue({
      ...this.data.item,
    });
  }

  createForm() {
    this.addItemShoppingList = this.fb.group({
      id: [''],
      ingredientName: ['', Validators.required],
      imgURL: [
        '',
        [
          Validators.required,
          Validators.pattern(/(https?:\/\/.*\.(?:png|jpg))/),
        ],
      ],
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  get ingredientName() {
    return this.addItemShoppingList.get('ingredientName');
  }
  get imgURL() {
    return this.addItemShoppingList.get('imgURL');
  }
  get price() {
    return this.addItemShoppingList.get('price');
  }
}
