import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { studentModel } from 'src/app/models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudentList(): Observable<studentModel[]> {
    return this.http.get<studentModel[]>('api/students');
  }

  addStudent(newStudent: any): Observable<any> {
    return this.http.post('api/students', newStudent);
  }

  updateStudent(updatedStudent: any): Observable<any> {
    return this.http.put(`api/students/?${updatedStudent.id}`, updatedStudent);
  }

  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete(`api/students/?${studentId}`);
  }

  getStudentById(studentId: string): Observable<any> {
    return this.http.get<studentModel>(`api/students/?${studentId}`);
  }
}
