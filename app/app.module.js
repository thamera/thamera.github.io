"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var app_component_1 = require('./app.component');
var app_globals_1 = require('./app.globals');
var auth_guard_1 = require('./shared/auth.guard');
var home_component_1 = require('./home/home.component');
var cardprinter_component_1 = require('./cardprinter/cardprinter.component');
var sprintreport_component_1 = require('./sprintreport/sprintreport.component');
var trelloauth_component_1 = require('./trello/trelloauth.component');
var settings_component_1 = require('./settings/settings.component');
var reportedlist_component_1 = require('./settings/reportedlist/reportedlist.component');
var app_routing_1 = require('./app.routing');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, ng2_bootstrap_1.Ng2BootstrapModule, app_routing_1.routing, http_1.HttpModule],
            providers: [
                auth_guard_1.AuthGuard,
                app_globals_1.Globals
            ],
            declarations: [app_component_1.AppComponent, trelloauth_component_1.trelloauthComponent, cardprinter_component_1.cardprinterComponent, sprintreport_component_1.sprintreportComponent, home_component_1.homeComponent,
                settings_component_1.SettingsComponent, reportedlist_component_1.ReportedListComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map