import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { AppSettings } from './settings.interface';

@Injectable()
export class SettingsService {
    private tPromise: any;
    private t: TrelloIFrame;

    constructor() {
        console.log("settings.service > constructor");
        console.dir(TrelloPowerUp);
        this.tPromise = TrelloPowerUp.Promise;
        this.t = TrelloPowerUp.iframe();
    }

    public getObservableSettings() {
        console.log("settings.service > getObservableSettings");
        console.dir(this.t);
        if (this.t) {
            console.log("try to get the data");
            this.t.get('board', 'shared', 'settings').then(function (result:any) {
                console.log("got trello data?", result);
            });
            let settingsRequest$ = Observable.fromPromise(this.t.get('board', 'shared', 'settings'))
                .catch(this.handleError);

            return settingsRequest$;
        }
        return null;
    }

    public saveSettings(settings:AppSettings) {
        if (this.t) {
            let saveSettingsRequest$ = Observable.fromPromise(this.t.set('board', 'shared', 'settings', settings))
                .catch(this.handleError);

            return saveSettingsRequest$;
        } else {
            return null;
        }
    }

    private handleError(error: any) {
        console.log("Caught an error in settings observable...");
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}