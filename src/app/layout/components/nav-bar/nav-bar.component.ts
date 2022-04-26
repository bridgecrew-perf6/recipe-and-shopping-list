import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ReloadState } from 'src/app/shared/actions/ingredient.actions';
import { IngredientState } from 'src/app/shared/states/ingredient.state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
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
