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
var TrelloService = (function () {
    //user.authenticate then success functiton
    function TrelloService() {
        this.storagePrefix = "trello_";
        this.useLocalStore = false;
        this.deferred = {};
        this.ready = {};
        if (localStorage) {
            this.useLocalStore = true;
        }
    }
    TrelloService.prototype.authorize = function (options) {
        var _this = this;
        var k;
        var persistToken;
        var ref;
        var regexToken = /[&#]?token=([0-9a-f]{64})/;
        var scope;
        var v;
        if (options.persist) {
            if (this.token == null) {
                this.token = this.readStorage("token");
            }
        }
        if (this.token == null) {
            this.token = (ref = regexToken.exec(location.hash)) != null ? ref[1] : void 0;
        }
        if (this.authorized()) {
            persistToken(options.persist);
            location.hash = location.hash.replace(regexToken, "");
            return typeof options.success === "function" ? options.success() : void 0;
        }
        if (!options.interactive) {
            return typeof options.error === "function" ? options.error() : void 0;
        }
        scope = (function () {
            var results = "";
            for (k in options.scope) {
                v = options.scope[k];
                if (v) {
                    results += "," + k;
                }
            }
            return results;
        });
        switch (options.type) {
            case "popup":
                (function () {
                    var authWindow, height, left, origin, receiveMessage, ref1, top, width;
                    _this.waitUntil("authorized", function () {
                        var authCallBack = function (isAuthorized) {
                            if (isAuthorized) {
                                persistToken();
                                return typeof options.success === "function" ? options.success() : void 0;
                            }
                            else {
                                return typeof options.error === "function" ? options.error() : void 0;
                            }
                        };
                        return function (isAuthorized) {
                            if (isAuthorized) {
                                persistToken();
                                return typeof options.success === "function" ? options.success() : void 0;
                            }
                            else {
                                return typeof options.error === "function" ? options.error() : void 0;
                            }
                        };
                    });
                });
        }
        //return Promise
    };
    TrelloService.prototype.persistToken = function (persist) {
        if (persist && (this.token != null)) {
            return this.writeStorage("token", this.token);
        }
    };
    TrelloService.prototype.authorized = function () {
        return this.token != null;
    };
    TrelloService.prototype.deauthorize = function () {
        this.token = null;
        this.writeStorage("token", this.token);
    };
    TrelloService.prototype.readStorage = function (key) {
        if (this.useLocalStore) {
            return localStorage.getItem(key);
        }
        else {
            var nameEq = key + "=";
            var ca = document.cookie.split(';');
            for (var i = 0, max = ca.length; i < max; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ')
                    c = c.substring(1, c.length);
                if (c.indexOf(nameEq) === 0)
                    return c.substring(nameEq.length, c.length);
            }
            return null;
        }
    };
    TrelloService.prototype.writeStorage = function (key, value) {
        if (this.useLocalStore) {
            if (value == null) {
                localStorage.removeItem(key);
            }
            else {
                localStorage.setItem(key, value);
            }
        }
        else {
            var exp = 30;
            if (value == null) {
                value = '';
                exp = -1;
            }
            var date = new Date();
            date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toUTCString();
            document.cookie = key + "=" + value + expires + "; path=/";
        }
    };
    TrelloService.prototype.waitUntil = function (name, fx) {
        if (this.ready[name] != null) {
            return fx(this.ready[name]);
        }
        else {
            return (this.deferred[name] != null ? this.deferred[name] : []).push(fx);
        }
    };
    TrelloService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TrelloService);
    return TrelloService;
}());
exports.TrelloService = TrelloService;
var Options = (function () {
    function Options(type, persist, interactive, scope, expiration, success, error) {
        if (type === void 0) { type = "redirect"; }
        if (persist === void 0) { persist = true; }
        if (interactive === void 0) { interactive = true; }
        if (scope === void 0) { scope = { read: true, write: false, account: false }; }
        if (expiration === void 0) { expiration = "30days"; }
        this.type = type;
        this.persist = persist;
        this.interactive = interactive;
        this.scope = scope;
        this.expiration = expiration;
        this.success = success;
        this.error = error;
    }
    return Options;
}());
//# sourceMappingURL=trello.service - Copy.js.map