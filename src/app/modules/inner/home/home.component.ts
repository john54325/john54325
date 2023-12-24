import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentService } from 'src/app/services/student/student.service';
import { ViewStudentComponent } from '../view-student/view-student.component';
import {
  CLASS_LIST,
  SECTION_LIST,
  YEAR_OPTION,
} from 'src/app/constants/common.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  filterForm!: FormGroup;
  editStudentForm!: FormGroup;

  sectionList = SECTION_LIST;
  classList = CLASS_LIST;
  filteredClassList: any;
  yearOptions = YEAR_OPTION;
  selectedIndex!: number;
  students: any[] = [];

  filteredStudents: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private studentService: StudentService
  ) {
    this.editStudentForm = this.formBuilder.group({
      name: [''],
      section: [''],
      year: [''],
      class: [''],
      id: [''],
      address: [''],
      gradeForSubject1: [''],
      gradeForSubject2: [''],
      gradeForSubject3: [''],
    });

    this.filterForm = this.formBuilder.group({
      selectedSection: [''],
      selectedYear: [''],
      selectedClass: [''],
    });
  }

  ngOnInit(): void {
    this.getStudentList();
  }

  getStudentList(): void {
    this.studentService.getStudentList().subscribe((response: any) => {
      this.students = response;
      this.filteredStudents = this.students;
    });
  }

  onChangeSection() {
    this.filteredClassList = this.classList.filter(
      (item: any) => item.section === this.filterForm.value.selectedSection
    )[0];
    this.filterForm.patchValue({
      selectedYear: '',
      selectedClass: '',
    });
  }

  onChangeYear() {
    this.filterForm.get('selectedClass')?.setValue('');
  }

  filterStudents() {
    const { selectedSection, selectedYear, selectedClass } =
      this.filterForm.value;
    if (selectedSection !== '' || selectedYear !== '' || selectedClass !== '') {
      this.filteredStudents = this.students.filter((student) => {
        let matches = student.section === selectedSection;
        if (selectedYear !== '') {
          matches = matches && student.year === Number(selectedYear);
        }
        if (selectedClass !== '') {
          matches = matches && student.class === selectedClass;
        }
        return matches;
      });
    }
  }

  resetFilter(): void {
    this.filterForm.patchValue({
      selectedSection: '',
      selectedYear: '',
      selectedClass: '',
    });
    this.filteredStudents = this.students;
  }

  onClickEdit(index: number): void {
    this.selectedIndex = index;
    this.editStudentForm.patchValue({
      name: this.filteredStudents[index].name,
      year: this.filteredStudents[index].year,
      class: this.filteredStudents[index].class,
      section: this.filteredStudents[index].section,
      id: this.filteredStudents[index].id,
      address: this.filteredStudents[index].address,
      gradeForSubject1: this.filteredStudents[index].gradeForSubject1,
      gradeForSubject2: this.filteredStudents[index].gradeForSubject2,
      gradeForSubject3: this.filteredStudents[index].gradeForSubject3,
    });
  }

  onClickSave(): void {
    this.selectedIndex = -1;
    this.studentService
      .updateStudent(this.editStudentForm.value)
      .subscribe((response: any) => {
        this.getStudentList();
      });
  }

  onClickDelete(studentId: string): void {
    // this.studentService.deleteStudent(studentId).subscribe((response: any) => {
    //   this.getStudentList();
    // });
    this.students = this.students.filter((item: any) => item.id !== studentId);
    this.filteredStudents = this.students;
  }

  onClickView(studentId: string): void {
    const dialogRef = this.dialog.open(ViewStudentComponent, {
      data: { studentId: studentId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getStudentList();
      }
    });
  }

  onClickAddStudent(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      data: { studentListLength: this.students.length },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getStudentList();
      }
    });
  }
}
