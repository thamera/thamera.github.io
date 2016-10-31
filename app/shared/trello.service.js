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
var storage_tokenkey = "trello4impl_token";
var trellokey = '2aa92cafd38af541fd512aa516050986';
var authEndpoint = "https://trello.com";
var TrelloService = (function () {
    function TrelloService() {
        var _this = this;
        this.deferred = {};
        this.ready = {};
        // Event listener to get user authentication token from trello and save
        this.receiveMessage = function (e) {
            var trelloWindow;
            //console.log('origin: ', e.origin)
            // Check if origin is proper
            //if (e.origin != 'http://localhost') { return }
            if (e.origin !== authEndpoint) {
                return;
            }
            if ((trelloWindow = e.source) != null) {
                //close window
                trelloWindow.close();
            }
            //console.log('parent received message!: ', e.data);
            //console.dir(e);
            if ((e.data != null) && /[0-9a-f]{64}/.test(e.data)) {
                _this.usertoken = e.data;
            }
            else {
                _this.usertoken = null;
            }
            localStorage.setItem(storage_tokenkey, _this.usertoken);
            if (typeof window.removeEventListener === 'function') {
                //remove event listener
                window.removeEventListener('message', _this.receiveMessage, false);
            }
            console.log("auth is ready");
            console.dir(_this);
            _this.isReady("authorized", _this.authorized());
        };
    }
    // Has Trello been authorized to issue requests on a user's behalf?
    TrelloService.prototype.authorized = function () {
        //return function () { return this.usertoken != null };
        if (this.usertoken == null || this.usertoken == "null") {
            return false;
        }
        else {
            return true;
        }
        //return this.usertoken != null;
    };
    // Clear any existing authorization
    TrelloService.prototype.deauthorize = function () {
        this.usertoken = null;
        localStorage.setItem(storage_tokenkey, this.usertoken);
    };
    // Request a token that will allow us to make API requests on a user's behalf
    TrelloService.prototype.authorize = function (success, failure) {
        var width, height, origin, authUrl, ref1, left, top, origin; //authWindow: Window, 
        console.log("Begin Authorization");
        this.waitUntil("authorized", (function (token) {
            return function (isAuthorized) {
                if (isAuthorized) {
                    if (token != null) {
                        localStorage.setItem(storage_tokenkey, token);
                    }
                    console.log("Authorization Succeeded - Sending Callback");
                    return typeof success === "function" ? success() : void 0;
                }
                else {
                    console.log("Authorization Failed - Sending Callback");
                    return typeof failure === "function" ? failure() : void 0;
                }
            };
        })(this.usertoken));
        width = 420;
        height = 470;
        left = window.screenX + (window.innerWidth - width) / 2;
        top = window.screenY + (window.innerHeight - height) / 2;
        origin = (ref1 = /^[a-z]+:\/\/[^\/]*/.exec(window.location.origin)) != null ? ref1[0] : void 0;
        authUrl = authEndpoint + "/1/authorize?return_url=" + origin + "&callback_method=postMessage&expiration=never&name=TrelloForImplementation&key=" + trellokey;
        //Get token from storage first if it exists
        if (!this.usertoken) {
            this.usertoken = localStorage.getItem(storage_tokenkey);
        }
        console.log("first auth test");
        if (this.authorized()) {
            console.log("Already authorized.  Get token from storage.");
            localStorage.setItem(storage_tokenkey, this.usertoken);
            return success;
        }
        this.authWindow = window.open(authUrl, 'trello', "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"; // Determine which listener method to use (attachEvent = IE8 or earlier)
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message"; // Determine correct method for listening to postmessage event
        eventer(messageEvent, this.receiveMessage, false);
    };
    TrelloService.prototype.waitUntil = function (name, fx) {
        console.log("trello.service > waitUntil");
        if (this.ready[name] != null) {
            return fx(this.ready[name]);
        }
        else {
            return (this.deferred[name] != null ? this.deferred[name] : this.deferred[name] = []).push(fx);
        }
    };
    TrelloService.prototype.isReady = function (name, value) {
        console.log("trello.service > isReady");
        var fx, fxs, i, len;
        console.log("running is ready");
        this.ready[name] = value;
        console.dir(this.ready);
        console.dir(this.deferred);
        if (this.deferred[name]) {
            fxs = this.deferred[name];
            delete this.deferred[name];
            for (i = 0, len = fxs.length; i < len; i++) {
                fx = fxs[i];
                fx(value);
            }
        }
    };
    ;
    TrelloService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TrelloService);
    return TrelloService;
}());
exports.TrelloService = TrelloService;
//# sourceMappingURL=trello.service.js.map