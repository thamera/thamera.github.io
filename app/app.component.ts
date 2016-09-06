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

    constructor() {
        console.dir(t);
    }
}
