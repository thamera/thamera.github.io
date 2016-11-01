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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var Observable_1 = require('rxjs/Observable');
var storage_tokenkey = "trello4impl_token";
var storage_tokendate = "trello4impl_token_date";
var storage_tokenexpiration = "trello4impl_token_expiration";
var trellokey = '2aa92cafd38af541fd512aa516050986';
var trelloEndpoint = "https://trello.com";
var trelloVersion = "/1/";
var TrelloService = (function () {
    function TrelloService(http) {
        var _this = this;
        this.http = http;
        this.deferred = {};
        this.ready = {};
        // Event listener to get user authentication token from trello and save
        this.receiveMessage = function (e) {
            console.log("trello.service > receiveMessage");
            var trelloWindow;
            // Check if origin is proper
            if (e.origin !== trelloEndpoint) {
                console.log("trello auth - response origin doesn't match: endpoint: " + trelloEndpoint + " || origin: " + e.origin);
                return;
            }
            if ((trelloWindow = e.source) != null) {
                //close window
                trelloWindow.close();
            }
            if ((e.data != null) && /[0-9a-f]{64}/.test(e.data)) {
                _this.usertoken = e.data;
            }
            else {
                _this.usertoken = null;
            }
            localStorage.setItem(storage_tokenkey, _this.usertoken);
            localStorage.setItem(storage_tokendate, Date.now().toString());
            localStorage.setItem(storage_tokenexpiration, _this.usertokenExpire);
            if (typeof window.removeEventListener === 'function') {
                //remove event listener
                window.removeEventListener('message', _this.receiveMessage, false);
            }
            _this.isReady("authorized", _this.authorized());
        };
        this.usertoken = localStorage.getItem(storage_tokenkey);
        this.usertokenExpire = localStorage.getItem(storage_tokenexpiration);
        this.usertokenExpireDate = new Date(parseInt(localStorage.getItem(storage_tokendate)));
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
    TrelloService.prototype.authorize = function (expiration, success, failure) {
        var width, height, origin, authUrl, ref1, left, top, origin; //authWindow: Window, 
        console.log("trello.service > authorize");
        this.usertokenExpire = expiration;
        this.waitUntil("authorized", (function (token) {
            return function (isAuthorized) {
                if (isAuthorized) {
                    if (token != null) {
                        localStorage.setItem(storage_tokenkey, token);
                    }
                    return typeof success === "function" ? success() : void 0;
                }
                else {
                    return typeof failure === "function" ? failure() : void 0;
                }
            };
        })(this.usertoken));
        width = 420;
        height = 470;
        left = window.screenX + (window.innerWidth - width) / 2;
        top = window.screenY + (window.innerHeight - height) / 2;
        origin = (ref1 = /^[a-z]+:\/\/[^\/]*/.exec(window.location.origin)) != null ? ref1[0] : void 0;
        authUrl = "" + trelloEndpoint + trelloVersion + "authorize?return_url=" + origin + "&callback_method=postMessage&expiration=" + expiration + "&name=TrelloForImplementation&key=" + trellokey;
        //Get token from storage first if it exists
        if (!this.usertoken) {
            this.usertoken = localStorage.getItem(storage_tokenkey);
        }
        console.log("first auth test");
        if (this.authorized()) {
            console.log("Already authorized.  Get token from storage.");
            localStorage.setItem(storage_tokenkey, this.usertoken);
            return typeof success === "function" ? success() : void 0;
        }
        this.authWindow = window.open(authUrl, 'trello', "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent"; // Determine which listener method to use (attachEvent = IE8 or earlier)
        var eventer = window[eventMethod];
        var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message"; // Determine correct method for listening to postmessage event
        eventer(messageEvent, this.receiveMessage, false);
    };
    TrelloService.prototype.trelloGet = function (method, args) {
        if (args) {
            args = args + "&";
        }
        else {
            args = "";
        }
        var restResult$ = this.http
            .get("" + trelloEndpoint + trelloVersion + method + "?" + args + "key=" + trellokey + "&token=" + this.usertoken, { headers: this.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        return restResult$;
    };
    TrelloService.prototype.trelloPost = function (method, data, args) {
        if (args) {
            args = args + "&";
        }
        else {
            args = "";
        }
        var requestBody = JSON.stringify(data);
        var restResult$ = this.http
            .post("" + trelloEndpoint + trelloVersion + method + "?" + args + "key=" + trellokey + "&token=" + this.usertoken, requestBody, { headers: this.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        return restResult$;
    };
    TrelloService.prototype.trelloPut = function (method, data, args) {
        if (args) {
            args = args + "&";
        }
        else {
            args = "";
        }
        var requestBody = JSON.stringify(data);
        var restResult$ = this.http
            .put("" + trelloEndpoint + trelloVersion + method + "?" + args + "key=" + trellokey + "&token=" + this.usertoken, requestBody, { headers: this.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        return restResult$;
    };
    TrelloService.prototype.trelloDelete = function (method, args) {
        if (args) {
            args = args + "&";
        }
        else {
            args = "";
        }
        var restResult$ = this.http
            .delete("" + trelloEndpoint + trelloVersion + method + "?" + args + "key=" + trellokey + "&token=" + this.usertoken, { headers: this.getHeaders() })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
        return restResult$;
    };
    TrelloService.prototype.getHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json, text/javascript');
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        // content tyoe: application/x-www-form-urlencoded; charset=UTF-8
        //accepts: {
        //    "*": allTypes,
        //        text: "text/plain",
        //            html: "text/html",
        //                xml: "application/xml, text/xml",
        //                    json: "application/json, text/javascript"
        //},
        return headers;
    };
    TrelloService.prototype.handleError = function (error) {
        console.error(error);
        if (error.status == 401 && error.text() == "unauthorized permission requested") {
            alert('Your Trello account authroization has expired.  Click the "Auth" link in the navigation menu to be redirected to the Trello Authorization page and re-authorize your account.  You may want to consider setting a longer authorization period if these messages occur too regularly.');
        }
        return Observable_1.Observable.throw(error.json().error || 'Server error');
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
        this.ready[name] = value;
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
        __metadata('design:paramtypes', [http_1.Http])
    ], TrelloService);
    return TrelloService;
}());
exports.TrelloService = TrelloService;
function validUserToken() {
    var userToken = localStorage.getItem(storage_tokenkey);
    //TODO: can we test for the expiration of the token here?
    return userToken != null && userToken != "null";
}
exports.validUserToken = validUserToken;
//# sourceMappingURL=trello.service.js.map