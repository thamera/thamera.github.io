import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AppComponent }  from './app.component';

import { homeComponent } from './home/home.component';
import { cardprinterComponent } from './cardprinter/cardprinter.component';
import { sprintreportComponent } from './sprintreport/sprintreport.component';

import { routing } from './app.routing';

@NgModule({
    imports: [BrowserModule, Ng2BootstrapModule, routing],
    declarations: [AppComponent, cardprinterComponent, sprintreportComponent, homeComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
