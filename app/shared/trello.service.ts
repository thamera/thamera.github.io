import { Injectable, HostListener } from '@angular/core';

const storage_tokenkey: string = "trello4impl_token";
const trellokey: string = '2aa92cafd38af541fd512aa516050986';
const authEndpoint: string = "https://trello.com";

@Injectable()
export class TrelloService {
    public usertoken: string;
    public authWindow: Window;

    private deferred:Object = {};
    private ready:Object = {};

    constructor() {
    }

    // Has Trello been authorized to issue requests on a user's behalf?
    public authorized() {
        //return function () { return this.usertoken != null };
        if (this.usertoken == null || this.usertoken == "null") {
            return false;
        } else {
            return true;
        }
        //return this.usertoken != null;
    }

    // Clear any existing authorization
    public deauthorize() {
        this.usertoken = null;
        localStorage.setItem(storage_tokenkey, this.usertoken);
    }

    // Request a token that will allow us to make API requests on a user's behalf
    public authorize(success:Function,failure:Function) {
        var width: number, height: number, origin: string, authUrl: string, ref1: Array<string>, left: number, top: number, origin: string; //authWindow: Window, 
        console.log("Begin Authorization");
        this.waitUntil("authorized", ((token:string) => {  //_thiss:TrelloService
            return function (isAuthorized:boolean) {
                if (isAuthorized) {
                    if (token != null) {
                        localStorage.setItem(storage_tokenkey, token);
                    }
                    console.log("Authorization Succeeded - Sending Callback");
                    return typeof success === "function" ? success() : void 0;
                } else {
                    console.log("Authorization Failed - Sending Callback");
                    return typeof failure === "function" ? failure() : void 0;
                }
            };
        })(this.usertoken) );

        width = 420;
        height = 470;
        left = window.screenX + (window.innerWidth - width) / 2;
        top = window.screenY + (window.innerHeight - height) / 2;
        origin = (ref1 = /^[a-z]+:\/\/[^\/]*/.exec(window.location.origin)) != null ? ref1[0] : void 0;
        authUrl = `${authEndpoint}/1/authorize?return_url=${origin}&callback_method=postMessage&expiration=never&name=TrelloForImplementation&key=${trellokey}`;

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

        this.authWindow = window.open(authUrl, 'trello', `width=${width},height=${height},left=${left},top=${top}`);

        var eventMethod:string = window.addEventListener ? "addEventListener" : "attachEvent";  // Determine which listener method to use (attachEvent = IE8 or earlier)
        var eventer:Function = window[eventMethod];
        var messageEvent:string = eventMethod == "attachEvent" ? "onmessage" : "message";  // Determine correct method for listening to postmessage event

        eventer(messageEvent, this.receiveMessage, false);
        
    }

    // Event listener to get user authentication token from trello and save
    private receiveMessage = (e: MessageEvent) => {
        var trelloWindow: Window;
        //console.log('origin: ', e.origin)

        // Check if origin is proper
        //if (e.origin != 'http://localhost') { return }
        if (e.origin !== authEndpoint) { // || e.source !== this.authWindow) { //Can't verify the window is the same
            return;
        }
        
        if ((trelloWindow = e.source) != null) {
            //close window
            trelloWindow.close();
        }
        //console.log('parent received message!: ', e.data);
        //console.dir(e);
        if ((e.data != null) && /[0-9a-f]{64}/.test(e.data)) {
            this.usertoken = e.data;

        } else {
            this.usertoken = null;
        }

        localStorage.setItem(storage_tokenkey, this.usertoken);

        if (typeof window.removeEventListener === 'function') {
            //remove event listener
            window.removeEventListener('message', this.receiveMessage, false);
        }
        console.log("auth is ready");
        console.dir(this);
        this.isReady("authorized", this.authorized());
    }

    private waitUntil(name:string, fx:Function) {
        console.log("trello.service > waitUntil");
        if (this.ready[name] != null) {
            return fx(this.ready[name]);
        } else {
            return (this.deferred[name] != null ? this.deferred[name] : this.deferred[name] = []).push(fx);
        }
    }

    private isReady(name:string, value:any) {
        console.log("trello.service > isReady");
        var fx: Function, fxs: Function, i: number, len: number;
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
}