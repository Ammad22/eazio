import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { UtilityService } from 'src/app/utility/utility.service';
import { UserInfo } from 'src/app/models/userInfo';
import { UserService } from 'src/app/services/user.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  passwordVisible = false;
  loginfailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private utilitySerivce: UtilityService,
    public store: Store,
    private userService: UserService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      emailOrUsername: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onSubmit() {
    if (this.form.valid) {
      const user: UserInfo = this.userService.getUser();
      const username = this.form.get('emailOrUsername').value;
      const password = this.form.get('password').value;
      if (user.username === username && user.password === password) {
        this.router.navigate(['dashboard']).then();
      }
      else {
        this.loginfailed = true;
      }
      this.utilitySerivce.IsUserLogedIn(this.store, true);
    }
  }
}
