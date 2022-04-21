import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormDetailIngredientComponent } from '../form-detail-ingredient/form-detail-ingredient.component';
import { ShoppingList } from 'src/app/core/model/shoppingList.model';

@Component({
  selector: 'app-filter-ingredient',
  templateUrl: './filter-ingredient.component.html',
  styleUrls: ['./filter-ingredient.component.scss'],
})
export class FilterIngredientComponent implements OnInit {
  @Input() listIngredient!: ShoppingList[];

  @Output() searchIngredient = new EventEmitter<string>();
  @Output() createIngredient = new EventEmitter<ShoppingList>();

  ingredientListUpdate = new Subject<string>();
  ingredientSearch: string = '';

  constructor(public dialog: MatDialog) {
    this.ingredientListUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value: string) => {
        if (value !== '') {
          this.searchIngredient.emit(value);
        } else {
          this.searchIngredient.emit('');
        }
      });
  }

  ngOnInit(): void {}

  handleAddItemShoppingList() {
    const dialogRef = this.dialog.open(FormDetailIngredientComponent, {
      width: '350px',
      data: { isCreate: true, listIngredient: this.listIngredient },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.id === '') {
        this.createIngredient.emit(result);
      }
    });
  }
}
