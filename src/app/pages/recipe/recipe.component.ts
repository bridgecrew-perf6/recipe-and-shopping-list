import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipeList } from 'src/app/core/model/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  recipeList: RecipeList[] = [];
  detailRecipe!: RecipeList;
  editDetailRecipe!: RecipeList;
  isAddRecipe: boolean = false;
  isDetail: boolean = false;
  isShowRecipeForm: boolean = false;
  isUpdateRecipe: boolean = false;
  durationInSeconds = 3;
  isLoading!: boolean;

  constructor(
    private _recipeService: RecipeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.fetchAllRecipe();
    window.scrollTo(0, 0);
  }

  /**
   * Fetch all list of recipe
   */
  fetchAllRecipe(): void {
    this._recipeService.getAllRecipe().subscribe((response: any) => {
      this.recipeList = response;
      if (this.isUpdateRecipe) {
        //get new recipe when update done
        this.detailRecipe = response.filter((items: any) => {
          return this.detailRecipe.id == items.id;
        })[0];
        this.isUpdateRecipe = false;
      }
      this.isLoading = false;
    });
  }

  handleAddRecipe(args: boolean) {
    this.isAddRecipe = this.isShowRecipeForm = args; //true
    this.isDetail = false;
  }

  /**
   * Create new recipe
   * @param args
   */
  handleCreateRecipe(args: RecipeList) {
    this._recipeService.createRecipe(args).subscribe(() => {
      this._snackBar.open('Create recipe success', 'Close', {
        duration: this.durationInSeconds * 1000,
      });
      this.fetchAllRecipe();
    });
  }

  handleShowDetailRecipe(args: { selectRecipe: RecipeList; isDetail: true }) {
    this.isShowRecipeForm = false;
    this.isDetail = args.isDetail;
    this.detailRecipe = args.selectRecipe;
  }

  handleEditRecipe(args: RecipeList) {
    this.isDetail = this.isAddRecipe = false;
    this.isShowRecipeForm = true;
    this.editDetailRecipe = args;
  }

  handleUpdateRecipe(args: RecipeList) {
    this.isDetail = this.isUpdateRecipe = true;
    this.isShowRecipeForm = false;
    this._recipeService.updateRecipe(args).subscribe(() => {
      this._snackBar.open('Update recipe success', 'Close', {
        duration: this.durationInSeconds * 1000,
      });
      this.fetchAllRecipe();
    });
  }

  handleDeleteRecipe(args: number) {
    this._recipeService.deleteRecipe(args).subscribe(() => {
      this.isShowRecipeForm = false;
      this._snackBar.open('Delete recipe success', 'Close', {
        duration: this.durationInSeconds * 1000,
      });
      this.fetchAllRecipe();
    });
  }

  handleSearchRecipe(foodName: string) {
    this._recipeService
      .searchRecipe(foodName)
      .subscribe((response: RecipeList[]) => {
        this.recipeList = response;
      });
  }

  handleCloseForm(arg: any) {
    this.isDetail = this.isUpdateRecipe = true;
    this.isShowRecipeForm = false;
  }
}
