// Type definition for Trello Powerup
// Definitions by: Travis Hamera
interface trelloIO {
    /** */
    handlers: Object;
    /** */
    hostHandlers: Object;
    /** */
    secret: string
    /** */
    targetOrigin: string
}
interface TrelloIFrame {
    /** Gets the list of arguments sent to the TrelloIframe */
    args: Array<TrelloIArgObject>;
    /** */
    io: trelloIO;
    /** Trello Options*/
    options: any;
    /** Trello Secret*/
    secret: string;

    /** Define a method that is called by the web client when there are updates, such as a new attachment*/
    render(renderer: Function): any
    /** Use this method to have Trello display a popup*/
    popup(options: Object): any;
    /** This method should be used within a popup callback to close the current popup*/
    closePopup(): any;
    /** This method should be used within a popup callback to return to the prior popup, if it exists.*/
    back(): any;
    /** Place an iframe on top of the Member’s experience*/
    overlay(urlObject: Object): any;
    /** This method should be used within an overlay to close the existing overlay.*/
    closeOverlay(): any;
    /** Used to render an iframe that is visible at the bottom of the standard board view. */
    boardBar(options: Object): any;
    /** Used to close the bottom Board Bar*/
    closeBoardBar(): any;
    /** Pass a URL to open as a new window for OAuth authentication purposes.*/
    authorize(urlWithSecret: string, options: Object): any;
    /** Sizes the current iframe based on the height of the element referenced via your selector.*/
    sizeTo(selector: string): any;

    /** Get access to the t object within an iframe*/
    iframe(): any;
    /** Used to store some persistent data in Trello's database.*/
    set(scope: string, visibility: string, name: string, value: any): any;
    /** Used to get all of the stored data for the Power-Up*/
    get(scope: string, visibility: string, name: string, defaultValue?: any): any;
    /** Attach a new URL to the card in the current context.*/
    attach(options: TrelloAttachment): any;
    /** Sign a URL for use with attachment- sections only.*/
    signUrl(URL: string): any;
    /** Localize a string by key*/
    localizeKey(key: string, data: string): any; 
    /** Localize an list of strings or objects*/
    localizeKeys(keys: Array<string>): any; 
    /** Returns a promise with information about the board for the current context Valid fields include: 'id', 'name', 'url', 'shortLink'*/
    board(...requestedField:Array<string>): any;
    /** Returns a promise with information about the list for the current context Valid fields include: 'id', 'name'*/
    list(...requestedField: Array<string>): any;
    /** Returns a promise with information about the card for the current context Valid fields include: 'id', 'name', 'desc', 'due', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink'*/
    card(...requestedField: Array<string>): any;
}
interface TrelloIArgObject {
    context: trelloArgObjectContext;
}
interface trelloArgObjectContext {
    /** Current Board ID*/
    board: string;
    /** Current Card ID (null if no card is open)*/
    card: string;
    command: string;
    el: string;
    member: string;
    options: Object;
    plugin: string;
    secret: string;
}
interface TrelloAttachment {
    url: string;
    name: string;
}

declare var t: TrelloIFrame;

declare var TrelloPowerUp: any;
/* *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

