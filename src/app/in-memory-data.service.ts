import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { studentModel } from './models/student.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
      {
        id: '1',
        name: 'John Doe',
        year: 2017,
        class: '1',
        section: 'Primary',
        address: 'fds',
        gradeForSubject1: 'A',
        gradeForSubject2: 'B',
        gradeForSubject3: 'C',
      },

      {
        id: '2',
        name: 'All Doe',
        year: 2018,
        class: '7',
        section: 'Secondary',
        address: 'dsgsdg',
        gradeForSubject1: 'A',
        gradeForSubject2: 'B',
        gradeForSubject3: 'C',
      },

      {
        id: '3',
        name: 'Alice Doe',
        year: 2019,
        class: 'LKG',
        section: 'KG',
        address: 'sdgsg',
        gradeForSubject1: 'A',
        gradeForSubject2: 'B',
        gradeForSubject3: 'C',
      },

      {
        id: '4',
        name: 'Jacob Doe',
        year: 2020,
        class: '2',
        section: 'Primary',
        address: 'ddsg',
        gradeForSubject1: 'A',
        gradeForSubject2: 'B',
        gradeForSubject3: 'C',
      },
      {
        id: '6',
        name: 'Kurian Doe',
        year: 2020,
        class: '2',
        section: 'Primary',
        address: 'ddsgrgr',
        gradeForSubject1: 'A',
        gradeForSubject2: 'B',
        gradeForSubject3: 'C',
      },

      {
        id: '5',
        name: 'Don Doe',
        year: 2021,
        class: '6',
        section: 'Secondary',
        address: 'gdg',
        gradeForSubject1: 'A',
        gradeForSubject2: 'B',
        gradeForSubject3: 'C',
      },
    ];
    const users = [
      { username: 'user1', password: 'password1' },
      { username: 'user2', password: 'password2' },
      { username: 'user3', password: 'password3' },
      { username: 'user4', password: 'password4' },
      { username: 'user5', password: 'password5' },
    ];
    return { students, users };
  }

  genId(heroes: studentModel[]): number {
    return heroes.length > 0
      ? Math.max(Number(...heroes.map((hero) => hero.id))) + 1
      : 11;
  }
}
