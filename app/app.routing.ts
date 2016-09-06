import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { homeComponent } from './home/home.component';
import { cardprinterComponent } from './cardprinter/cardprinter.component';
import { sprintreportComponent } from './sprintreport/sprintreport.component';

const appRoutes: Routes = [
    {
        path: '',
        component: homeComponent
    },
    {
        path: 'cardprinter',
        component: cardprinterComponent
    },
    {
        path: 'sprintreport',
        component: sprintreportComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);