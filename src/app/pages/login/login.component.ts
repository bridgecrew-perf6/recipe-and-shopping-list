import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isAccountExist: boolean = true;

  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private router: Router
  ) {
    this.createLoginForm();
  }

  ngOnInit(): void {}

  createLoginForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleLogin(): void {
    this._loginService.getUser(this.loginForm.value).subscribe((data) => {
      if (data?.length < 1) this.isAccountExist = false;
      else this.router.navigateByUrl('/recipe');
    });
  }
}
