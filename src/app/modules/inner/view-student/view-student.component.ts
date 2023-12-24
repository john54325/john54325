import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent {
  studentsDetails!: any;

  constructor(
    private studentService: StudentService,
    public dialogRef: MatDialogRef<ViewStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getStudentList();
  }

  getStudentList(): void {
    this.studentService
      .getStudentById(this.data.studentId)
      .subscribe((response: any) => {
        // this.studentsDetails = response;
        this.studentsDetails = response.filter(
          (item: any) => item.id === this.data.studentId
        )[0];
      });
  }
}
