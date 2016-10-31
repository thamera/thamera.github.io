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
//import { Router } from '@angular/router';
//import { Http } from '@angular/http';
var trello_service_1 = require('../shared/trello.service');
//import { contentHeaders } from '../common/headers';
var trelloauthComponent = (function () {
    function trelloauthComponent(trelloService) {
        this.trelloService = trelloService;
        this.title = 'Trello Authorization';
    }
    trelloauthComponent.prototype.authorize = function () {
        event.preventDefault();
        console.log("I'm here");
        this.trelloService.authorize(this.authorizeSuccess, this.authorizeFailure);
    };
    trelloauthComponent.prototype.deauthorize = function () {
        event.preventDefault();
        this.trelloService.deauthorize();
    };
    trelloauthComponent.prototype.authorizeSuccess = function () {
        console.log("I'm authorized");
    };
    trelloauthComponent.prototype.authorizeFailure = function () {
        console.log("Authorization failed");
    };
    trelloauthComponent = __decorate([
        core_1.Component({
            selector: 'trelloauth',
            templateUrl: 'app/trello/trelloauth.component.html',
            providers: [trello_service_1.TrelloService]
        }), 
        __metadata('design:paramtypes', [trello_service_1.TrelloService])
    ], trelloauthComponent);
    return trelloauthComponent;
}());
exports.trelloauthComponent = trelloauthComponent;
//# sourceMappingURL=trelloauth.component.js.map