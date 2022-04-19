import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ReloadState } from './shared/actions/ingredient.actions';
import { IngredientState } from './shared/states/ingredient.state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  allIngredientCart!: number;
  isUpdateCart: boolean = false;
  @Select(IngredientState.getIngredients) ingredients$!: Observable<any>;
  constructor(
    private _ingredientState: IngredientState,
    private _store: Store
  ) {
    this.ingredients$.subscribe((data: any[]) => {
      this.allIngredientCart = data?.length;
    });
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      this.allIngredientCart = this._ingredientState.allIngredientLocal?.length;
      this._store.dispatch(
        new ReloadState(this._ingredientState.allIngredientLocal)
      );
    }
  }
}
