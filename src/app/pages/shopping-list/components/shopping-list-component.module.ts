import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Material library
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ListIngredientComponent } from './list-ingredient/list-ingredient.component';
import { MatCardModule } from '@angular/material/card';
import { FilterIngredientComponent } from './filter-ingredient/filter-ingredient.component';
import { FormDetailIngredientComponent } from './form-detail-ingredient/form-detail-ingredient.component';

@NgModule({
  declarations: [ListIngredientComponent, FilterIngredientComponent, FormDetailIngredientComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
  ],
  exports: [ListIngredientComponent, FilterIngredientComponent],
  providers: [],
})
export class ShoppingListComponentsModule { }
