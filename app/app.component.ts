import { Component } from '@angular/core';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'Trello-4-Impl',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    title = 'Trello for Implementations';
    public isCollapsed: boolean = true;
    public secret: string = "";
    public tFrame: any;

    constructor() {
        console.dir(t);
        this.secret = t.secret;
        console.log("secret: " + this.secret);

        //var Promise = TrelloPowerUp.Promise;
        //this.tFrame = TrelloPowerUp.iframe();
        this.trelloAuthorize.then((res) => {
            console.log("done trelloAuthorize");
            console.dir(res);
        });

    }

    trelloAuthorize = new Promise((resolve, reject) => {
        t.authorize((res: any) => {
            return './auth?secret=' + res;
        }, { width: 600, height: 680 })
            .then((token: any) => {
                console.log("token:" + token);
                return (token);
            })
            .then(resolve)
            .done();
    });
}
