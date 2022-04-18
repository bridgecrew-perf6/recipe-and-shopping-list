import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
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
  constructor() {
    this.ingredients$.subscribe((data: any[]) => {
      this.allIngredientCart = data.length;
    });
  }
}
