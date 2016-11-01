import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { Http } from '@angular/http';
import { TrelloService } from '../shared/trello.service';
//import { contentHeaders } from '../common/headers';

export interface Authform {
    expiration?: string;
}

@Component({
    selector: 'trelloauth',
    templateUrl: 'app/trello/trelloauth.component.html'
})
export class trelloauthComponent {
    title = 'Trello Authorization';
    public tokenExpiration: string;
    public userTokenDate: Date;
    public userTokenExpiration: string;
    authform: Authform;
    public expirationtypes = [
        { value: '1hour', display: 'In 1 Hour' },
        { value: '1day', display: 'In 1 Day' },
        { value: '30days', display: 'In 30 Days' },
        { value: 'never', display: 'Never Expires' }
    ];


    constructor(public router: Router, public trelloService: TrelloService) { 
        this.getTokenData();
    }

    ngOnInit() {
        // initialize user model here
        this.authform = {
            expiration: this.expirationtypes[2].value
        }
    }

    authorize(): void {
        event.preventDefault();
        console.log("I'm here");
        this.trelloService.authorize(this.authform.expiration, this.authorizeSuccess, this.authorizeFailure);
    }

    public data: any;
    testing(): void {
        event.preventDefault();
        this.trelloService.trelloGet("boards/1En9U0s6/")
            .subscribe((data) => console.dir(data),
            error => console.log(error),
            () => console.log('Get all Items complete'));
    }

    deauthorize(): void {
        event.preventDefault();
        this.trelloService.deauthorize();
        this.userTokenDate = null;
        this.userTokenExpiration = null;
    }

    private authorizeSuccess = () => {
        console.log("I'm authorized");
        this.router.navigate(['home']);
    }

    private authorizeFailure = () => {
        console.log("Authorization failed");
    }

    private getTokenData() {
        this.userTokenDate = this.trelloService.usertokenExpireDate;
        this.userTokenExpiration = this.trelloService.usertokenExpire;
    }
}