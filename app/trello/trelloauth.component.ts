import { Component } from '@angular/core';
//import { Router } from '@angular/router';
//import { Http } from '@angular/http';
import { TrelloService } from '../shared/trello.service';
//import { contentHeaders } from '../common/headers';

@Component({
    selector: 'trelloauth',
    templateUrl: 'app/trello/trelloauth.component.html',
    providers: [TrelloService]
})
export class trelloauthComponent {
    title = 'Trello Authorization';

    constructor(public trelloService: TrelloService) { //public router: Router, 
    }

    authorize(): void {
        event.preventDefault();
        console.log("I'm here");
        this.trelloService.authorize(this.authorizeSuccess, this.authorizeFailure);
    }

    deauthorize(): void {
        event.preventDefault();
        this.trelloService.deauthorize();
    }

    private authorizeSuccess() {
        console.log("I'm authorized");
    }

    private authorizeFailure() {
        console.log("Authorization failed");
    }
}