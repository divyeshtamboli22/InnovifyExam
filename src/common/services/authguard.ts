import { AuthService } from './auth.service';
import { CanActivate } from "@angular/router";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        public authService: AuthService,
        public router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate(['/signin']);
        return false;


    }

}