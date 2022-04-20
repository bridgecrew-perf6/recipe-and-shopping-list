import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingList } from 'src/app/core/model/shoppingList.model';
import { ShoppingListService } from 'src/app/core/services/shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  constructor(
    private _shoppingListService: ShoppingListService,
    public _snackBar: MatSnackBar
  ) {}

  listIngredient!: ShoppingList[];
  limitNumber: number = 15;
  isLoading!: boolean;
  durationInSeconds = 3;

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchDataIngredient();
    window.scrollTo(0, 0);
  }

  fetchDataIngredient() {
    this._shoppingListService
      .getAllShoppingList(this.limitNumber)
      .subscribe((data: ShoppingList[]) => {
        this.listIngredient = data;
        this.isLoading = false;
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
      .subscribe(() => {
        this.fetchDataIngredient(),
          this._snackBar.open('Create ingredient success', 'Close', {
            duration: this.durationInSeconds * 1000,
          });
      });
  }

  handleDeleteIngredient(id: number) {
    this._shoppingListService.deleteIngredientShoppingList(id).subscribe(() => {
      this.fetchDataIngredient();
      this._snackBar.open('Delete ingredient success', 'Close', {
        duration: this.durationInSeconds * 1000,
      });
    });
  }
  handleUpdateIngredient(ingredient: ShoppingList) {
    this._shoppingListService
      .updateIngredientShoppingList(ingredient)
      .subscribe(() => {
        this.fetchDataIngredient();
        this._snackBar.open('Update ingredient success', 'Close', {
          duration: this.durationInSeconds * 1000,
        });
      });
  }
}
