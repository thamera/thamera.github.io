import { Injectable, HostListener } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

const storage_tokenkey: string = "trello4impl_token";
const storage_tokendate: string = "trello4impl_token_date";
const storage_tokenexpiration: string = "trello4impl_token_expiration";
const trellokey: string = '2aa92cafd38af541fd512aa516050986';
const trelloEndpoint: string = "https://trello.com";
const trelloVersion: string = "/1/";

@Injectable()
export class TrelloService {
    public usertoken: string;
    public usertokenExpire: string;
    public usertokenExpireDate: Date;
    public authWindow: Window;

    private deferred:Object = {};
    private ready:Object = {};

    constructor(private http: Http) {
        this.usertoken = localStorage.getItem(storage_tokenkey);
        this.usertokenExpire = localStorage.getItem(storage_tokenexpiration);
        this.usertokenExpireDate = new Date(parseInt(localStorage.getItem(storage_tokendate)));
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
    public authorize(expiration:string,success:Function,failure:Function) {
        var width: number, height: number, origin: string, authUrl: string, ref1: Array<string>, left: number, top: number, origin: string; //authWindow: Window, 
        console.log("trello.service > authorize");

        this.usertokenExpire = expiration;

        this.waitUntil("authorized", ((token: string) => {  //_thiss:TrelloService
            return function (isAuthorized:boolean) {
                if (isAuthorized) {
                    if (token != null) {
                        localStorage.setItem(storage_tokenkey, token);
                    }
                    return typeof success === "function" ? success() : void 0;
                } else {
                    return typeof failure === "function" ? failure() : void 0;
                }
            };
        })(this.usertoken) );

        width = 420;
        height = 470;
        left = window.screenX + (window.innerWidth - width) / 2;
        top = window.screenY + (window.innerHeight - height) / 2;
        origin = (ref1 = /^[a-z]+:\/\/[^\/]*/.exec(window.location.origin)) != null ? ref1[0] : void 0;
        authUrl = `${trelloEndpoint}${trelloVersion}authorize?return_url=${origin}&callback_method=postMessage&expiration=${expiration}&name=TrelloForImplementation&key=${trellokey}`;

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

        this.authWindow = window.open(authUrl, 'trello', `width=${width},height=${height},left=${left},top=${top}`);

        var eventMethod:string = window.addEventListener ? "addEventListener" : "attachEvent";  // Determine which listener method to use (attachEvent = IE8 or earlier)
        var eventer:Function = window[eventMethod];
        var messageEvent:string = eventMethod == "attachEvent" ? "onmessage" : "message";  // Determine correct method for listening to postmessage event

        eventer(messageEvent, this.receiveMessage, false);
        
    }

    public trelloGet(method:string,args?:string){
        if (args) {
            args = args + "&";
        } else {
            args = "";
        }

        let restResult$ = this.http
            .get(`${trelloEndpoint}${trelloVersion}${method}?${args}key=${trellokey}&token=${this.usertoken}`, { headers: this.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
        return restResult$;
    }
    public trelloPost(method: string, data: any, args?: string) {
        if (args) {
            args = args + "&";
        } else {
            args = "";
        }

        let requestBody = JSON.stringify(data);

        let restResult$ = this.http
            .post(`${trelloEndpoint}${trelloVersion}${method}?${args}key=${trellokey}&token=${this.usertoken}`, requestBody, { headers: this.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
        return restResult$;
    }
    public trelloPut(method: string, data: any, args?: string) {
        if (args) {
            args = args + "&";
        } else {
            args = "";
        }

        let requestBody = JSON.stringify(data);

        let restResult$ = this.http
            .put(`${trelloEndpoint}${trelloVersion}${method}?${args}key=${trellokey}&token=${this.usertoken}`, requestBody, { headers: this.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
        return restResult$;
    }
    public trelloDelete(method: string, args?: string) {
        if (args) {
            args = args + "&";
        } else {
            args = "";
        }

        let restResult$ = this.http
            .delete(`${trelloEndpoint}${trelloVersion}${method}?${args}key=${trellokey}&token=${this.usertoken}`, { headers: this.getHeaders() })
            .map(res => res.json())
            .catch(this.handleError);
        return restResult$;
    }

    private getHeaders() {
        let headers = new Headers();
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
    }

    // Event listener to get user authentication token from trello and save
    private receiveMessage = (e: MessageEvent) => {
        console.log("trello.service > receiveMessage");
        var trelloWindow: Window;

        // Check if origin is proper
        if (e.origin !== trelloEndpoint) { // || e.source !== this.authWindow) { //Can't verify the window is the same
            console.log("trello auth - response origin doesn't match: endpoint: " + trelloEndpoint + " || origin: " + e.origin); 
            return;
        }
        
        if ((trelloWindow = e.source) != null) {
            //close window
            trelloWindow.close();
        }
        if ((e.data != null) && /[0-9a-f]{64}/.test(e.data)) {
            this.usertoken = e.data;

        } else {
            this.usertoken = null;
        }

        localStorage.setItem(storage_tokenkey, this.usertoken);
        localStorage.setItem(storage_tokendate, Date.now().toString());
        localStorage.setItem(storage_tokenexpiration, this.usertokenExpire);

        if (typeof window.removeEventListener === 'function') {
            //remove event listener
            window.removeEventListener('message', this.receiveMessage, false);
        }
        this.isReady("authorized", this.authorized());
    }

    private handleError(error: Response) {
        console.error(error);
        if (error.status == 401 && error.text() == "unauthorized permission requested") {
            alert('Your Trello account authroization has expired.  Click the "Auth" link in the navigation menu to be redirected to the Trello Authorization page and re-authorize your account.  You may want to consider setting a longer authorization period if these messages occur too regularly.');
        }
        return Observable.throw(error.json().error || 'Server error');
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
}

export function validUserToken(): boolean {
    const userToken: string = localStorage.getItem(storage_tokenkey);

    //TODO: can we test for the expiration of the token here?

    return userToken != null && userToken != "null";
}