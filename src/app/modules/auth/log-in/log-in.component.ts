import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userModel } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  loginFormFG!: FormGroup;
  isSubmitted = false;
  showErrorMessage = false;
  userList: userModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginFormFG = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.getUserList();
  }

  login(): void {
    this.isSubmitted = true;
    if (this.loginFormFG.valid) {
      if (this.validateUserCredential()) {
        this.loginService.setUserLoggedInStatus();
        alert('Login Success');
        this.router.navigate(['/home']);
      } else {
        this.showErrorMessage = true;
      }
    }
  }

  getUserList(): void {
    this.loginService.getUsers().subscribe((response: any) => {
      this.userList = response;
    });
  }

  validateUserCredential(): boolean {
    return this.userList.some(
      (user) =>
        user.username === this.loginFormFG.value.userName &&
        user.password === this.loginFormFG.value.password
    );
  }
}
