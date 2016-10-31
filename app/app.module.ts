import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent }  from './app.component';

import { AuthGuard } from './shared/auth.guard';

import { homeComponent } from './home/home.component';
import { cardprinterComponent } from './cardprinter/cardprinter.component';
import { sprintreportComponent } from './sprintreport/sprintreport.component';
import { trelloauthComponent } from './trello/trelloauth.component';

import { routing } from './app.routing';

@NgModule({
    imports: [BrowserModule, Ng2BootstrapModule, routing],
    providers: [
        AuthGuard,
    ],
    declarations: [AppComponent, trelloauthComponent, cardprinterComponent, sprintreportComponent, homeComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
