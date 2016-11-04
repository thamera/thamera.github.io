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
//import 'rxjs/add/operator/map';
require('rxjs/add/operator/catch');
require('rxjs/add/observable/fromPromise');
var Observable_1 = require('rxjs/Observable');
var SettingsService = (function () {
    function SettingsService() {
        console.log("settings.service > constructor");
        console.dir(TrelloPowerUp);
        this.tPromise = TrelloPowerUp.Promise;
        this.t = TrelloPowerUp.iframe();
    }
    SettingsService.prototype.getObservableSettings = function () {
        console.log("settings.service > getObservableSettings");
        console.dir(this.t);
        if (this.t) {
            console.log("try to get the data");
            this.t.get('board', 'shared', 'settings').then(function (result) {
                console.log("got trello data?", result);
            });
            var settingsRequest$ = Observable_1.Observable.fromPromise(this.t.get('board', 'shared', 'settings'))
                .catch(this.handleError);
            return settingsRequest$;
        }
        return null;
    };
    SettingsService.prototype.saveSettings = function (settings) {
        if (this.t) {
            var saveSettingsRequest$ = Observable_1.Observable.fromPromise(this.t.set('board', 'shared', 'settings', settings))
                .catch(this.handleError);
            return saveSettingsRequest$;
        }
        else {
            return null;
        }
    };
    SettingsService.prototype.handleError = function (error) {
        console.log("Caught an error in settings observable...");
        console.error(error);
        return Observable_1.Observable.throw(error || 'Server error');
    };
    SettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map