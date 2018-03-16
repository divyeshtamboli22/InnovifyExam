import { AuthService } from './../common/services/auth.service';
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    public authService: AuthService,
    public router: Router) { }

  logout() {
    swal({
      title: 'Logged out successfully',
      type: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1000
    }).then(data => {
      this.authService.logout();
      this.router.navigate(['/signin']);
    }).catch();

  }
}
