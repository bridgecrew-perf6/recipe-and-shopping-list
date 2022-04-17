import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/core/services/shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  constructor(private _shoppingListService: ShoppingListService) {}

  listIngredient!: any[];
  limitNumber: number = 15;

  ngOnInit(): void {
    this.fetchDataIngredient();
  }

  fetchDataIngredient() {
    this._shoppingListService
      .getAllShoppingList(this.limitNumber)
      .subscribe((data) => {
        this.listIngredient = data;
      });
  }

  handleMoreItem(moreItem: number) {
    this.limitNumber += moreItem;
    this.fetchDataIngredient();
  }

  handleSearchIngredient(ingredientName: string) {
    this._shoppingListService
      .searchAllShoppingList(this.limitNumber, ingredientName)
      .subscribe((data) => {
        this.listIngredient = data;
      });
  }
}
