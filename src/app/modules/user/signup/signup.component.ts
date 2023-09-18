import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserService } from 'src/app/services/user.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  passwordVisible = false;
  confirmPasswordVisible = false;
  formSubmitted = false;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private utilitySerivce: UtilityService,
    public store: Store,
    public router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      contactNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
    this.form.get('confirmPassword').setErrors(null);
  }

  onBlurConfirmPassword() {
    const password = this.form.get('password').value;
    const confirmPassword = this.form.get('confirmPassword').value;

    const passwordMatch = password === confirmPassword;
    this.form.get('confirmPassword').setErrors(passwordMatch ? null : { passwordMismatch: true });

  }

  togglePasswordVisibility(controlName: string) {
    if (controlName === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else if (controlName === 'confirmPassword') {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.form.valid) {
      const user = this.form.value;
      const password = this.form.get('password').value;
      this.userService.saveUser(user, password);
      this.router.navigate(['signin']).then();
    }
  }
}
