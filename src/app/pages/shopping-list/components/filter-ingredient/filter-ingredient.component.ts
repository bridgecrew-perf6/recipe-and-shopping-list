import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-filter-ingredient',
  templateUrl: './filter-ingredient.component.html',
  styleUrls: ['./filter-ingredient.component.scss'],
})
export class FilterIngredientComponent implements OnInit {
  @Output() searchIngredient = new EventEmitter<string>();

  ingredientListUpdate = new Subject<string>();
  ingredientSearch: string = '';

  constructor() {
    this.ingredientListUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value: string) => {
        if (value !== '') {
          this.searchIngredient.emit(value);
        } else {
          this.searchIngredient.emit('');
        }
      });
  }

  ngOnInit(): void {}
}
