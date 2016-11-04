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
var settings_service_1 = require('./settings.service');
var SettingsComponent = (function () {
    function SettingsComponent(formBuilder, settingsService) {
        this.formBuilder = formBuilder;
        this.settingsService = settingsService;
        this.title = 'Settings';
        this.events = [];
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsForm = this.formBuilder.group({
            test: ['TESTING', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            currentsprint: this.formBuilder.group({
                number: [1],
                startDate: [''],
                endDate: []
            }),
            reportedLists: this.formBuilder.array([])
        });
        console.log("Get settings...");
        this.settingsService.getObservableSettings()
            .subscribe(function (data) {
            console.dir(data);
            _this.settingsForm
                .patchValue(data, { onlySelf: true });
            data.reportedLists.forEach(function (list) {
                var control = _this.settingsForm.controls['reportedLists'];
                control.push(_this.formBuilder.group(list));
            });
            console.dir(_this.settingsForm);
        }, function (error) { return console.log("Error", error); }, function () { return console.log("Got settings service data"); });
        // subscribe to form changes  
        this.subscribeToFormChanges();
        // Update single value
        //(<FormControl>this.settingsForm.controls['test'])
        //    .setValue('Test2', { onlySelf: true });
    };
    SettingsComponent.prototype.onSubmit = function (model, isValid) {
        this.submitted = true;
        this.settingsService.saveSettings(model)
            .subscribe(function (data) { return console.dir(data); }, function (error) { return console.log("Error", error); }, function () { return console.log("Saved settings service data"); });
        //.then(function () {
        //    t.closePopup();
        //});
    };
    SettingsComponent.prototype.addReportedList = function (listname, listId, order) {
        var control = this.settingsForm.controls['reportedLists'];
        var reportedList = {
            listName: [listname],
            listId: [listId],
            order: [order],
            displayName: ["", [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            GroupByLabels: [false],
            showCheckLists: [false],
            showDescription: [false],
            showComments: [false]
        };
        control.push(this.formBuilder.group(reportedList));
    };
    SettingsComponent.prototype.moveReportedList = function (i, position) {
    };
    SettingsComponent.prototype.removeReportedList = function (i) {
        var control = this.settingsForm.controls['reportedLists'];
        control.removeAt(i);
    };
    SettingsComponent.prototype.subscribeToFormChanges = function () {
        var _this = this;
        var myFormStatusChanges$ = this.settingsForm.statusChanges;
        var myFormValueChanges$ = this.settingsForm.valueChanges;
        myFormStatusChanges$.subscribe(function (x) { return _this.events.push({ event: 'STATUS_CHANGED', object: x }); });
        myFormValueChanges$.subscribe(function (x) { return _this.events.push({ event: 'VALUE_CHANGED', object: x }); });
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'Trello-4-Impl-Settings',
            templateUrl: 'app/settings/settings.component.html',
            styleUrls: ['app/settings/settings.component.css'],
            providers: [settings_service_1.SettingsService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, settings_service_1.SettingsService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map