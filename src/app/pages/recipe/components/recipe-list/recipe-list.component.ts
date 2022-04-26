import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { RecipeList } from 'src/app/core/model/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
  @Input() recipeList!: RecipeList[];
  @Input() isUpdateRecipe!: boolean;

  @Output() isAddRecipe = new EventEmitter<boolean>();
  @Output() showDetail = new EventEmitter<{
    selectRecipe: RecipeList;
    isDetail: true;
  }>();
  @Output() searchRecipe = new EventEmitter<string>();

  recipeListData!: RecipeList[];
  recipeListUpdate = new Subject<string>();
  recipeSearch: string = '';

  constructor() {
    this.recipeListUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value: string) => {
        if (!value) {
          this.searchRecipe.emit('');
        } else {
          this.searchRecipe.emit(value);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.recipeListData = this.recipeList;
    if (changes['isUpdateRecipe']?.currentValue) {
      this.recipeSearch = '';
    }
  }
  /**
   * Select specific of recipe
   * @param id number
   */
  handleSelectRecipe(id: number) {
    document.body.clientWidth < 575 &&
      window.scrollTo(0, document.body.scrollHeight);

    const selectRecipe = this.recipeList.filter((item: any) => {
      return item.id === id;
    })[0];

    this.showDetail.emit({
      selectRecipe,
      isDetail: true,
    });
  }

  handleAddRecipe() {
    this.isAddRecipe.emit(true);
  }
}
