export class AddIngredient {
  static readonly type = '[ingredient] Add';
  constructor(public payload: any) {}
}

export class RemoveIngredient {
  static readonly type = '[ingredient] Remove';
  constructor(public payload: number) {}
}

export class AddAmountIngredient {
  static readonly type = '[ingredient] addAmount';
  constructor(public payload: number) {}
}

export class SubtractAmountIngredient {
  static readonly type = '[ingredient] subtractAmount';
  constructor(public payload: number) {}
}

export class ChangeInputAmount {
  static readonly type = '[ingredient] changeInput';
  constructor(public payload: any) {}
}

export class ReloadState {
  static readonly type = '[ingredient] reloadState';
  constructor(public payload: any) {}
}

export class ClearCart {
  static readonly type = '[ingredient] clearCart';
  constructor() {}
}
