import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { RecipeComponentsModule } from './components/recipe-components.module';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [RecipeComponent],
  imports: [
    CommonModule,
    RecipeComponentsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,

    RouterModule.forChild([
      {
        path: '',
        component: RecipeComponent,
      },
    ]),
  ],
  providers: [],
})
export class RecipeModule {}
