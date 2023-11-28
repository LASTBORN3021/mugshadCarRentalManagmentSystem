import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye';
  showPassword: boolean = false; // Define the showPassword property

  SignupForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.SignupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required,Validators.email],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.isText = this.showPassword;
    this.eyeIcon = this.showPassword ? 'fa-eye-slash' : 'fa-eye';
    this.type = this.showPassword ? 'text' : 'password';
  }

  onSubmit() {
    if (this.SignupForm.valid) {
      // submit to db
      if (this.SignupForm.valid){
        // submit to db
        // this.auth.signUp(this.SignupForm.value).subscribe(
        //   (res) => {
        //     console.log('Response from server:', res);
        //     alert(res.message);
        //     console.log(res?.message);
        //   },
        //   (err) => {
        //     console.error('Error from server:', err);
        //     alert(err?.error?.message || 'An error occurred during signup.');
        //   }
        // );
    } else {
      // print error using toster and with required field
      this.validateAllForm(this.SignupForm);
      alert('Your form is invalid');
    }
  }}

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
