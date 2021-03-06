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
var router_1 = require('@angular/router');
var trello_service_1 = require('./shared/trello.service');
var AppComponent = (function () {
    //public tFrame: any;
    function AppComponent(router, trelloService) {
        this.router = router;
        this.trelloService = trelloService;
        this.title = 'Trello for Implementations';
        //public isCollapsed: boolean = true;
        this.secret = "";
        console.dir(t);
        console.dir(TrelloPowerUp);
        this.secret = t.secret;
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'Trello-4-Impl',
            templateUrl: 'app/app.component.html',
            styleUrls: ['app/app.component.css'],
            providers: [trello_service_1.TrelloService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, trello_service_1.TrelloService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map