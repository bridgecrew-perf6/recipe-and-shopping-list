import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Material library
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import {
  DialogContent,
  RecipeFormComponent,
} from './recipe-form/recipe-form.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeFormComponent,
    RecipeDetailComponent,
    DialogContent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [RecipeListComponent, RecipeFormComponent, RecipeDetailComponent],
  providers: [],
})
export class RecipeComponentsModule {}
