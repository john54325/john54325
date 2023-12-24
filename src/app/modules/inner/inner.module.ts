import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerRoutingModule } from './inner-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddStudentComponent } from './add-student/add-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';

@NgModule({
  declarations: [HomeComponent, AddStudentComponent, ViewStudentComponent],
  imports: [CommonModule, InnerRoutingModule, SharedModule],
})
export class InnerModule {}
