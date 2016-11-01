import { Component } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Router } from '@angular/router';
import { TrelloService } from './shared/trello.service';

@Component({
    selector: 'Trello-4-Impl',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [TrelloService]
})
export class AppComponent {
    title = 'Trello for Implementations';
    //public isCollapsed: boolean = true;
    public secret: string = "";
    //public tFrame: any;

    constructor(public router: Router, public trelloService: TrelloService) { 
        console.dir(t);
        this.secret = t.secret;
    }

    //trelloAuthorize = new Promise((resolve, reject) => {
    //    t.authorize((res: any) => {
    //        return './auth?secret=' + res;
    //    }, { width: 600, height: 680 })
    //        .then((token: any) => {
    //            console.log("token:" + token);
    //            return (token);
    //        })
    //        .then(resolve)
    //        .done();
    //});
}
