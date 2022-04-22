import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ShoppingList } from 'src/app/core/model/shoppingList.model';
import { AddIngredient } from 'src/app/shared/actions/ingredient.actions';
import { FormDetailIngredientComponent } from '../form-detail-ingredient/form-detail-ingredient.component';
@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.scss'],
})
export class ListIngredientComponent implements OnInit {
  @Input() listIngredient!: ShoppingList[];

  @Output() addMoreItem = new EventEmitter<number>();
  @Output() updateIngredient = new EventEmitter<ShoppingList>();
  @Output() deleteIngredient = new EventEmitter<number>();

  constructor(private _store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {}

  handleMoreItem() {
    this.addMoreItem.emit(15);
  }

  handleAddToCart(arg: any) {
    this._store.dispatch(new AddIngredient({ ...arg, amount: 1 }));
  }

  openDialog(arg: any) {
    const dialogRef = this.dialog.open(FormDetailIngredientComponent, {
      width: '350px',
      data: { isCreate: false, item: arg, listIngredient: this.listIngredient },
    });

    dialogRef
      .afterClosed()
      .subscribe((result: { isDelete: boolean; payload: any }) => {
        if (result?.isDelete) {
          this.deleteIngredient.emit(result.payload);
        } else if (!result?.isDelete && result) {
          this.updateIngredient.emit(result.payload);
        }
      });
  }
}
