import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CartCheckComponent } from './cart-check.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartCheckComponentsModule } from './components/cart-check-component.module';
@NgModule({
  declarations: [CartCheckComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    CartCheckComponentsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CartCheckComponent,
      },
    ]),
  ],
  providers: [],
})
export class CartCheckModule {}
