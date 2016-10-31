import { Component } from '@angular/core';

@Component({
    selector: 'auth',
    templateUrl: 'app/auth/auth.component.html'
})
export class AuthComponent {
    title = 'Trello Authorization';

    constructor() {
    }

    authorize() {
        //event.preventDefault();

    }
}