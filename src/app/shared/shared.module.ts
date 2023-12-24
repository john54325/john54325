import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

const exportable = [CommonModule, ReactiveFormsModule, MatDialogModule];

@NgModule({
  declarations: [],
  imports: exportable,
  exports: exportable,
})
export class SharedModule {}
