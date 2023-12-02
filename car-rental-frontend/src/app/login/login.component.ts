import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  loginForm!: FormGroup;
  showPassword: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.isText = this.showPassword;
    this.eyeIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    this.type = this.showPassword ? 'text' : 'password';
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Submit login data to the server using the login method from the AuthService
      // this.auth.login(this.loginForm.value).subscribe(
      //   (res) => {
      //     console.log('Response from server:', res);
      //     alert(res.message);
      //     console.log(res?.message);
      //   },
      //   (err) => {
      //     console.error('Error from server:', err);
      //     alert(err?.error?.message || 'An error occurred during login.');
      //   }
      // );
    } else {
      // Print error using toaster and mark required fields as dirty
      this.validateAllForm(this.loginForm);
      alert('Your form is invalid');
    }
  }

  private validateAllForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllForm(control);
      } else {
        control?.markAsDirty({ onlySelf: true });
      }
    });
  }

}
