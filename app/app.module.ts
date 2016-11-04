import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent }  from './app.component';
import { Globals } from './app.globals';
import { AuthGuard } from './shared/auth.guard';

import { homeComponent } from './home/home.component';
import { cardprinterComponent } from './cardprinter/cardprinter.component';
import { sprintreportComponent } from './sprintreport/sprintreport.component';
import { trelloauthComponent } from './trello/trelloauth.component';
import { SettingsComponent } from './settings/settings.component';
import { ReportedListComponent } from './settings/reportedlist/reportedlist.component';

import { routing } from './app.routing';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, Ng2BootstrapModule, routing, HttpModule],
    providers: [
        AuthGuard,
        Globals
    ],
    declarations: [AppComponent, trelloauthComponent, cardprinterComponent, sprintreportComponent, homeComponent,
        SettingsComponent, ReportedListComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
