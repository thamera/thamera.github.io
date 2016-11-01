import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { validUserToken } from '../shared/trello.service';
//import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public router: Router) { }

    canActivate() {
        if (validUserToken()) {
            return true;
        }

        this.router.navigate(['trelloauth']);
        return false;
    }
}