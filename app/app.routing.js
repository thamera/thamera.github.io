"use strict";
var router_1 = require('@angular/router');
var auth_guard_1 = require('./shared/auth.guard');
var trelloauth_component_1 = require('./trello/trelloauth.component');
var home_component_1 = require('./home/home.component');
var cardprinter_component_1 = require('./cardprinter/cardprinter.component');
var sprintreport_component_1 = require('./sprintreport/sprintreport.component');
var settings_component_1 = require('./settings/settings.component');
var appRoutes = [
    { path: '', component: trelloauth_component_1.trelloauthComponent },
    { path: 'trelloauth', component: trelloauth_component_1.trelloauthComponent },
    { path: 'home', component: home_component_1.homeComponent },
    { path: 'cardprinter', component: cardprinter_component_1.cardprinterComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'sprintreport', component: sprintreport_component_1.sprintreportComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'settings', component: settings_component_1.SettingsComponent },
    { path: '**', component: trelloauth_component_1.trelloauthComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, {
    useHash: true
});
//# sourceMappingURL=app.routing.js.map