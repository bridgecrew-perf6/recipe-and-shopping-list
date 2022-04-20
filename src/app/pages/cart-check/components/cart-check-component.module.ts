import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// Material library
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CartListComponent } from './cart-list/cart-list.component';

@NgModule({
  declarations: [CartListComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [CartListComponent],
  providers: [],
})
export class CartCheckComponentsModule {}
