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
var forms_1 = require('@angular/forms');
var AppComponent = (function () {
    //test: AbstractControl;
    function AppComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.title = 'Settings';
        this.events = [];
        this.Promise = TrelloPowerUp.Promise;
        this.t = TrelloPowerUp.iframe();
    }
    AppComponent.prototype.ngOnInit = function () {
        this.settingsForm = this.formBuilder.group({
            test: ['TESTING', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            currentsprint: this.formBuilder.group({
                number: [0],
                startDate: [''],
                endDate: []
            })
        });
        //TODO:  hookup service with existing data
        // (<FormGroup>this.settingsForm)
        //     .setValue(existingSettings, { onlySelf: true });  //where existingSettings is the incoming data model from trello.
        if (this.t) {
            this.t.render(function () {
                return Promise.all([
                    this.t.get('board', 'shared', 'settings')
                ])
                    .then(function (_a) {
                    var settings = _a[0];
                    if (settings) {
                        //(<FormGroup>this.settingsForm)
                        //.setValue(existingSettings, { onlySelf: true });
                        console.log(settings);
                    }
                })
                    .then(function () {
                    //t.sizeTo('#content')
                    //    .done();
                });
            });
        }
        // subscribe to form changes  
        this.subscribeToFormChanges();
        // Update single value
        this.settingsForm.controls['test']
            .setValue('Test2', { onlySelf: true });
    };
    AppComponent.prototype.subscribeToFormChanges = function () {
        var _this = this;
        var myFormStatusChanges$ = this.settingsForm.statusChanges;
        var myFormValueChanges$ = this.settingsForm.valueChanges;
        myFormStatusChanges$.subscribe(function (x) { return _this.events.push({ event: 'STATUS_CHANGED', object: x }); });
        myFormValueChanges$.subscribe(function (x) { return _this.events.push({ event: 'VALUE_CHANGED', object: x }); });
    };
    AppComponent.prototype.onSubmit = function (model, isValid) {
        this.submitted = true;
        console.log(model, isValid);
        if (this.t) {
            this.t.set('board', 'shared', 'settings', model);
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'Trello-4-Impl-Settings',
            templateUrl: 'settingsapp/app.component.html',
            styleUrls: ['settingsapp/app.component.css'],
            providers: []
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map