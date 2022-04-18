import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddIngredient } from 'src/app/shared/actions/ingredient.actions';
@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.scss'],
})
export class ListIngredientComponent implements OnInit {
  @Input() listIngredient!: any[];
  @Output() addMoreItem = new EventEmitter<number>();

  constructor(private _store: Store) {}

  ngOnInit(): void {}

  handleMoreItem() {
    this.addMoreItem.emit(15);
  }

  handleAddToCart(arg: any) {
    // const {ingredientName, id, price} = arg;
    this._store.dispatch(new AddIngredient({ ...arg, amount: 1 }));
  }
}
