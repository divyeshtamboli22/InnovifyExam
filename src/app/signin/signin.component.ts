import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { User } from './../../common/models/user.model';
import { AuthService } from '../../common/services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    const user = new User(this.loginForm.value.email, this.loginForm.value.password);
    this.authService.login(user).subscribe(
      result => {
        swal({
          title: 'Logged in successfully',
          type: 'success',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000
        }).then(data => {
          this.router.navigate(['/home']);
        }).catch();
      },
      error => {
        swal({
          title: 'Invalid Credentials !',
          type: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000
        }).then().catch();
      }
    )
  }

}
