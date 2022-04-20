import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Ingredient } from 'src/app/core/model/cart.model';
import {
  AddIngredient,
  RemoveIngredient,
  AddAmountIngredient,
  SubtractAmountIngredient,
  ChangeInputAmount,
  ReloadState,
  ClearCart,
} from '../actions/ingredient.actions';
export class IngredientStateModel {
  ingredients!: any[];
  totalPrice!: number;
}

@State<IngredientStateModel>({
  name: 'ingredients',
  defaults: {
    ingredients: [],
    totalPrice: 0,
  },
})
@Injectable()
export class IngredientState {
  set allIngredientLocal(arg: any[]) {
    localStorage.setItem('ingredient', JSON.stringify(arg));
  }
  get allIngredientLocal(): any[] {
    return JSON.parse(localStorage.getItem('ingredient') ?? 'null');
  }

  @Selector()
  static getIngredients(state: IngredientStateModel) {
    return state.ingredients;
  }

  @Selector()
  static getTotalPrice(state: IngredientStateModel) {
    return state.totalPrice;
  }

  @Action(AddIngredient)
  add(
    { getState, patchState }: StateContext<IngredientStateModel>,
    { payload }: AddIngredient
  ) {
    const state = getState();
    let isHaveId: boolean = false;
    if (state.ingredients?.length === 0) {
      (this.allIngredientLocal = [...state.ingredients, payload]),
        patchState({
          ingredients: [...state.ingredients, payload],
          totalPrice: [...state.ingredients, payload].reduce(
            (total: number, currentVal: any) => {
              return total + currentVal.price * currentVal.amount;
            },
            0
          ),
        });
    } else {
      for (let item of state.ingredients) {
        if (item.id == payload.id) {
          item.amount += 1;
          isHaveId = true;
          this.allIngredientLocal = state.ingredients;
          patchState({
            totalPrice: state.ingredients.reduce(
              (total: number, currentVal: any) => {
                return total + currentVal.price * currentVal.amount;
              },
              0
            ),
          });
        }
      }
      if (!isHaveId) {
        this.allIngredientLocal = [...state.ingredients, payload];
        patchState({
          ingredients: [...state.ingredients, payload],
          totalPrice: [...state.ingredients, payload].reduce(
            (total: number, currentVal: any) => {
              return total + currentVal.price * currentVal.amount;
            },
            0
          ),
        });
      }
    }
  }

  @Action(RemoveIngredient)
  remove(
    { getState, patchState }: StateContext<IngredientStateModel>,
    { payload }: AddIngredient
  ) {
    patchState({
      ingredients: getState().ingredients.filter(
        (item: any) => item.id !== payload
      ),
      totalPrice: getState()
        .ingredients.filter((item: any) => item.id !== payload)
        .reduce((total: number, currentVal: any) => {
          return total + currentVal.price * currentVal.amount;
        }, 0),
    });
    this.allIngredientLocal = getState().ingredients.filter(
      (item: any) => item.id !== payload
    );
  }

  @Action(AddAmountIngredient)
  addAmount(
    { getState, patchState }: StateContext<IngredientStateModel>,
    { payload }: any
  ) {
    const { ingredients } = getState();
    for (let item of ingredients) {
      if (item.id == payload) {
        item.amount += 1;
      }
    }
    patchState({
      totalPrice: getState().ingredients.reduce(
        (total: number, currentVal: any) => {
          return total + currentVal.price * currentVal.amount;
        },
        0
      ),
    });
    this.allIngredientLocal = ingredients;
  }

  @Action(SubtractAmountIngredient)
  subtractAmount(
    { getState, patchState }: StateContext<IngredientStateModel>,
    { payload }: any
  ) {
    const { ingredients } = getState();
    for (let item of ingredients) {
      if (item.id == payload) {
        item.amount -= 1;
      }
    }
    patchState({
      totalPrice: getState().ingredients.reduce(
        (total: number, currentVal: any) => {
          return total + currentVal.price * currentVal.amount;
        },
        0
      ),
    });
    this.allIngredientLocal = ingredients;
  }

  @Action(ChangeInputAmount)
  changeInputAmount(
    { getState, patchState }: StateContext<IngredientStateModel>,
    { payload }: any
  ) {
    const { ingredients } = getState();
    for (let item of ingredients) {
      if (item.id == payload.id) {
        item.amount = +payload.amount;
      }
    }
    patchState({
      totalPrice: getState().ingredients.reduce(
        (total: number, currentVal: any) => {
          return total + currentVal.price * currentVal.amount;
        },
        0
      ),
    });
    this.allIngredientLocal = ingredients;
  }

  @Action(ReloadState)
  reloadState(
    { getState, patchState }: StateContext<IngredientStateModel>,
    { payload }: any
  ) {
    patchState({
      ingredients: payload,
      totalPrice: payload?.reduce((total: number, currentVal: any) => {
        return total + currentVal.price * currentVal.amount;
      }, 0),
    });
  }

  @Action(ClearCart)
  clearCard({ patchState }: StateContext<IngredientStateModel>) {
    patchState({
      ingredients: [],
      totalPrice: 0,
    });
    this.allIngredientLocal = [];
  }
}
