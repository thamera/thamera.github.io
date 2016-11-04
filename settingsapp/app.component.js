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
var settings_service_1 = require('../app/shared/settings.service');
var AppComponent = (function () {
    function AppComponent(formBuilder, settingsService) {
        this.formBuilder = formBuilder;
        this.settingsService = settingsService;
        this.title = 'Settings';
        this.events = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsForm = this.formBuilder.group({
            test: ['TESTING', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            currentsprint: this.formBuilder.group({
                number: [1],
                startDate: [''],
                endDate: []
            }),
            reportedList: this.formBuilder.array([])
        });
        this.settingsService.getObservableSettings()
            .subscribe(function (data) {
            console.dir(data);
            _this.settingsForm
                .setValue(data, { onlySelf: true });
        }, function (error) { return console.log("Error", error); }, function () { return console.log("Got settings service data"); });
        // subscribe to form changes  
        this.subscribeToFormChanges();
        // Update single value
        //(<FormControl>this.settingsForm.controls['test'])
        //    .setValue('Test2', { onlySelf: true });
    };
    AppComponent.prototype.onSubmit = function (model, isValid) {
        this.submitted = true;
        this.settingsService.saveSettings(model)
            .subscribe(function (data) { return console.dir(data); }, function (error) { return console.log("Error", error); }, function () { return console.log("Saved settings service data"); });
        //.then(function () {
        //    t.closePopup();
        //});
    };
    AppComponent.prototype.addReportedList = function (listname, listId, order) {
        var control = this.settingsForm.controls['reportedList'];
        var reportedList = {
            listName: listname,
            listId: listId,
            order: order,
        };
        control.push(this.formBuilder.group(reportedList));
    };
    AppComponent.prototype.moveReportedList = function (i, position) {
    };
    AppComponent.prototype.removeReportedList = function (i) {
        var control = this.settingsForm.controls['reportedList'];
        control.removeAt(i);
    };
    AppComponent.prototype.subscribeToFormChanges = function () {
        var _this = this;
        var myFormStatusChanges$ = this.settingsForm.statusChanges;
        var myFormValueChanges$ = this.settingsForm.valueChanges;
        myFormStatusChanges$.subscribe(function (x) { return _this.events.push({ event: 'STATUS_CHANGED', object: x }); });
        myFormValueChanges$.subscribe(function (x) { return _this.events.push({ event: 'VALUE_CHANGED', object: x }); });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'Trello-4-Impl-Settings',
            templateUrl: 'settingsapp/app.component.html',
            styleUrls: ['settingsapp/app.component.css'],
            providers: [settings_service_1.SettingsService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, settings_service_1.SettingsService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map