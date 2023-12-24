import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { userModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isUserLoggedIn = false;
  constructor(private http: HttpClient) {}

  getUsers(): Observable<userModel[]> {
    // return this.http.get<userModel[]>('assets/data/users.json');
    return this.http.get<userModel[]>('api/users');
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  setUserLoggedInStatus(): void {
    this.isUserLoggedIn = true;
  }
}
