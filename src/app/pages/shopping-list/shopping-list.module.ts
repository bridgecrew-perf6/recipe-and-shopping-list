import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingListComponentsModule } from './components/shopping-list-component.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [ShoppingListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ShoppingListComponentsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingListComponent,
      },
    ]),
  ],
  providers: [],
})
export class ShoppingListModule {}
