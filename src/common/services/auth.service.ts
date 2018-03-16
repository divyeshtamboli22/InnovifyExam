import { User } from './../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from "@angular/http";

import 'rxjs/Rx';

import { Router } from '@angular/router';
@Injectable()
export class AuthService {

    private isLoggedIn = false;
    constructor(
        public http: HttpClient,
        public router: Router) { }

    userLoggedIn() {
        return this.isLoggedIn;
    }

    login(user: User) {
        return this.http.post<any>('/api/authenticate', { email: user.email, password: user.password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.isLoggedIn = true;
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isLoggedIn = false;
        this.router.navigate(['/signin']);
    }
    signup(user: User): Observable<any> {
        return this.http.post('/api/users', user)

            .map((response: Response) => {
                console.log(response);

            })
            .catch((error: Response) => Observable.throw(error))
    }


}