import { Component, OnInit } from '@angular/core';
import { ShoppingList } from 'src/app/core/model/shoppingList.model';
import { ShoppingListService } from 'src/app/core/services/shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  constructor(private _shoppingListService: ShoppingListService) {}

  listIngredient!: ShoppingList[];
  limitNumber: number = 15;

  ngOnInit(): void {
    this.fetchDataIngredient();
  }

  fetchDataIngredient() {
    this._shoppingListService
      .getAllShoppingList(this.limitNumber)
      .subscribe((data: ShoppingList[]) => {
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
      .subscribe((data: ShoppingList[]) => {
        this.listIngredient = data;
      });
  }

  handleCreateIngredient(ingredient: ShoppingList) {
    this._shoppingListService
      .createIngredientShoppingList(ingredient)
      .subscribe(() => this.fetchDataIngredient());
  }

  handleDeleteIngredient(id: number) {
    this._shoppingListService
      .deleteIngredientShoppingList(id)
      .subscribe(() => this.fetchDataIngredient());
  }
  handleUpdateIngredient(ingredient: ShoppingList) {
    this._shoppingListService
      .updateIngredientShoppingList(ingredient)
      .subscribe(() => this.fetchDataIngredient());
  }
}
