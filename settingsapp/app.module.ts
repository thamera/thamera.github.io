import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { ReportedListComponent } from './reportedlist/reportedlist.component';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, Ng2BootstrapModule],
    providers: [
    ],
    declarations: [AppComponent, ReportedListComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }