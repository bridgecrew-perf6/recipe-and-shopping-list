import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddAmountIngredient,
  AddIngredient,
  ChangeInputAmount,
  ReloadState,
  RemoveIngredient,
  SubtractAmountIngredient,
} from 'src/app/shared/actions/ingredient.actions';
import { IngredientState } from 'src/app/shared/states/ingredient.state';

@Component({
  selector: 'app-cart-check',
  templateUrl: './cart-check.component.html',
  styleUrls: ['./cart-check.component.scss'],
})
export class CartCheckComponent implements OnInit {
  @Select(IngredientState.getIngredients) ingredients$!: Observable<any>;
  @Select(IngredientState.getTotalPrice) totalPrice$!: Observable<number>;
  totalCash: number = 0;
  constructor(
    private _store: Store,
    private _ingredientState: IngredientState
  ) {
    this.totalPrice$.subscribe((data) => {
      this.totalCash = data;
    });
    // Checking is page reload
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      this._store.dispatch(
        new ReloadState(this._ingredientState.allIngredientLocal)
      );
    }
  }

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
    this._store.dispatch(
      new ChangeInputAmount({ id, amount: arg.target.value })
    );
  }
}
