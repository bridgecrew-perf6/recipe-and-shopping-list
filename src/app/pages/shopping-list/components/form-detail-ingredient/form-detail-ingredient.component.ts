import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-form-detail-ingredient',
  templateUrl: './form-detail-ingredient.component.html',
  styleUrls: ['./form-detail-ingredient.component.scss'],
})
export class FormDetailIngredientComponent implements OnInit {
  addItemShoppingList!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<FormDetailIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.createForm();
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
      price: ['', Validators.required],
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
