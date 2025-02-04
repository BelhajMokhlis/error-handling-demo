import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { } 