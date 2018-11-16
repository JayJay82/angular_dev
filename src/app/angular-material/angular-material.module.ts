import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [MatButtonModule, MatCheckboxModule,MatInputModule,MatSnackBarModule]
})
export class AngularMaterialModule { }
