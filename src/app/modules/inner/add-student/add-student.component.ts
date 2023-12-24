import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CLASS_LIST,
  SECTION_LIST,
  YEAR_OPTION,
} from 'src/app/constants/common.constants';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent {
  addStudentFG!: FormGroup;
  sectionList = SECTION_LIST;
  classList = CLASS_LIST;
  filteredClassList: any;
  yearOptions = YEAR_OPTION;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    public dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addStudentFG = this.formBuilder.group({
      id: (this.data.studentListLength + 1).toString(),
      name: [''],
      year: [''],
      class: [''],
      section: [''],
      address: [''],
      gradeForSubject1: [''],
      gradeForSubject2: [''],
      gradeForSubject3: [''],
    });
  }

  onChangeSection() {
    this.filteredClassList = this.classList.filter(
      (item: any) => item.section === this.addStudentFG.value.section
    )[0];
  }

  onSubmit(): void {
    this.studentService
      .addStudent(this.addStudentFG.value)
      .subscribe((response: any) => {
        this.dialogRef.close(response);
      });
  }
}
