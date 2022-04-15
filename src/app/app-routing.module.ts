import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recipe',
    loadChildren: () =>
      import('./pages/recipe/recipe.module').then((m) => m.RecipeModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./pages/shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  { path: '', redirectTo: 'recipe', pathMatch: 'prefix' },
  // { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
