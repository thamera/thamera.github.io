import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth.guard';

import { trelloauthComponent } from './trello/trelloauth.component';
import { homeComponent } from './home/home.component';
import { cardprinterComponent } from './cardprinter/cardprinter.component';
import { sprintreportComponent } from './sprintreport/sprintreport.component';
import { SettingsComponent } from './settings/settings.component';

const appRoutes: Routes = [
    { path: '', component: trelloauthComponent },
    { path: 'trelloauth', component: trelloauthComponent },
    { path: 'home',           component: homeComponent },
    { path: 'cardprinter', component: cardprinterComponent, canActivate: [AuthGuard] },
    { path: 'sprintreport', component: sprintreportComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent },
    { path: '**', component: trelloauthComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
    useHash: true
});