import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'recipe',
    loadChildren: () =>
      import('./recipe/recipe.module').then((m) => m.RecipeModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'cart-check',
    loadChildren: () =>
      import('./cart-check/cart-check.module').then((m) => m.CartCheckModule),
  },
  { path: '', redirectTo: 'recipe', pathMatch: 'prefix' },
];

export { Routing };
