import { Router } from '@angular/router';
import { AuthService } from './../../common/services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../../common/models/user.model';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup;
  public data: any;
  public cropperSettings: CropperSettings;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router) {

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(30)]],
      lastName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      dateOfBirth: ['', [Validators.required, this.validateBirthDate]],
      address: ['', Validators.required]
    });
  }

  submit() {

    console.log(this.signUpForm);
    if (!this.signUpForm.valid) {
      this.signUpForm.get('firstName').markAsDirty();
      this.signUpForm.get('lastName').markAsDirty();
      this.signUpForm.get('email').markAsDirty();
      this.signUpForm.get('password').markAsDirty();
      this.signUpForm.get('mobile').markAsDirty();
      this.signUpForm.get('dateOfBirth').markAsDirty();
      this.signUpForm.get('address').markAsDirty();
    } else {
      const formValue = this.signUpForm.value;
      const user = new User(
        formValue.email,
        formValue.password,
        formValue.firstName,
        formValue.lastName,
        formValue.mobile,
        formValue.dateOfBirth,
        formValue.address,
        this.data.image);

      this.authService.signup(user).subscribe(
        result => {
          swal({
            title: 'You have signed up successfully',
            type: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1000
          }).then(data => {
            this.router.navigate(['/signin']);
          }).catch();
        },
        error => {
          swal({
            title: 'Email is already taken !',
            type: 'error',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1000
          }).then(data => {

          }).catch();
        }
      );
    }

  }

  addImage() {
  }



  validateBirthDate(control: AbstractControl) {


    // if (!control.value && control.value === "") {
    //   return { validDate: true };
    // }
    const selectedDate = new Date(control.value);
    const todayDate = new Date();

    if (selectedDate > todayDate) {
      return { validDate: true };
    }
    return null;
  }

}
