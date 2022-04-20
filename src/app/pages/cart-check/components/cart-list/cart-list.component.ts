import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddAmountIngredient,
  ChangeInputAmount,
  RemoveIngredient,
  SubtractAmountIngredient,
} from 'src/app/shared/actions/ingredient.actions';
import { IngredientState } from 'src/app/shared/states/ingredient.state';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {
  @Select(IngredientState.getIngredients) ingredients$!: Observable<any>;

  constructor(private _store: Store) {}

  ngOnInit(): void {}
  handleAddAmount(arg: any) {
    this._store.dispatch(new AddAmountIngredient(arg));
  }

  handleSubtractAmount(arg: any) {
    this._store.dispatch(new SubtractAmountIngredient(arg));
  }

  handleDeleteIngredient(arg: any) {
    this._store.dispatch(new RemoveIngredient(arg));
  }

  handleChange(arg: any, id: number) {
    if (arg.target.value == 0) {
      this._store.dispatch(new RemoveIngredient(id));
    } else {
      this._store.dispatch(
        new ChangeInputAmount({ id, amount: arg.target.value })
      );
    }
  }
}
