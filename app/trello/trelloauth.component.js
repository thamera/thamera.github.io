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
//import { Http } from '@angular/http';
var trello_service_1 = require('../shared/trello.service');
var trelloauthComponent = (function () {
    function trelloauthComponent(router, trelloService) {
        var _this = this;
        this.router = router;
        this.trelloService = trelloService;
        this.title = 'Trello Authorization';
        this.expirationtypes = [
            { value: '1hour', display: 'In 1 Hour' },
            { value: '1day', display: 'In 1 Day' },
            { value: '30days', display: 'In 30 Days' },
            { value: 'never', display: 'Never Expires' }
        ];
        this.authorizeSuccess = function () {
            console.log("I'm authorized");
            _this.router.navigate(['home']);
        };
        this.authorizeFailure = function () {
            console.log("Authorization failed");
        };
        this.getTokenData();
    }
    trelloauthComponent.prototype.ngOnInit = function () {
        // initialize user model here
        this.authform = {
            expiration: this.expirationtypes[2].value
        };
    };
    trelloauthComponent.prototype.authorize = function () {
        event.preventDefault();
        console.log("I'm here");
        this.trelloService.authorize(this.authform.expiration, this.authorizeSuccess, this.authorizeFailure);
    };
    trelloauthComponent.prototype.testing = function () {
        event.preventDefault();
        this.trelloService.trelloGet("boards/1En9U0s6/")
            .subscribe(function (data) { return console.dir(data); }, function (error) { return console.log(error); }, function () { return console.log('Get all Items complete'); });
    };
    trelloauthComponent.prototype.deauthorize = function () {
        event.preventDefault();
        this.trelloService.deauthorize();
        this.userTokenDate = null;
        this.userTokenExpiration = null;
    };
    trelloauthComponent.prototype.getTokenData = function () {
        this.userTokenDate = this.trelloService.usertokenExpireDate;
        this.userTokenExpiration = this.trelloService.usertokenExpire;
    };
    trelloauthComponent = __decorate([
        core_1.Component({
            selector: 'trelloauth',
            templateUrl: 'app/trello/trelloauth.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, trello_service_1.TrelloService])
    ], trelloauthComponent);
    return trelloauthComponent;
}());
exports.trelloauthComponent = trelloauthComponent;
//# sourceMappingURL=trelloauth.component.js.map