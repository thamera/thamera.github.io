import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { AppSettings, ReportedList } from './settings.interface';
import { SettingsService } from './settings.service';

@Component({
    selector: 'Trello-4-Impl-Settings',
    templateUrl: 'app/settings/settings.component.html',
    styleUrls: ['app/settings/settings.component.css'],
    providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
    title = 'Settings';
    public settingsForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

    constructor(private formBuilder: FormBuilder, private settingsService: SettingsService ) {
    }

    ngOnInit() {
        this.settingsForm = this.formBuilder.group({
            test: ['TESTING', [Validators.required, Validators.minLength(5)]],
            currentsprint: this.formBuilder.group({
                number: [1],
                startDate: [''],
                endDate: []
            }),
            reportedLists: this.formBuilder.array([])
        });

        console.log("Get settings...");
        this.settingsService.getObservableSettings()
            .subscribe((data:AppSettings) => {
                console.dir(data);
                (<FormGroup>this.settingsForm)
                    .patchValue(data, { onlySelf: true });

                data.reportedLists.forEach(
                    (list: ReportedList) => {
                        const control = <FormArray>this.settingsForm.controls['reportedLists'];
                        control.push(this.formBuilder.group(list));
                    } 
                );

                console.dir(this.settingsForm);
            },
            error => console.log("Error", error),
            () => console.log("Got settings service data"));

        // subscribe to form changes  
        this.subscribeToFormChanges();

        // Update single value
        //(<FormControl>this.settingsForm.controls['test'])
        //    .setValue('Test2', { onlySelf: true });
    }

    onSubmit(model: AppSettings, isValid: boolean): void {
        this.submitted = true;
        this.settingsService.saveSettings(model)
            .subscribe((data) => console.dir(data),
            error => console.log("Error", error),
            () => console.log("Saved settings service data"));
        //.then(function () {
        //    t.closePopup();
        //});
    }

    addReportedList(listname: string, listId: string, order: number) {
        const control = <FormArray>this.settingsForm.controls['reportedLists'];
        let reportedList = {
            listName: [listname],
            listId: [listId],
            order: [order],
            displayName: ["", [Validators.required, Validators.minLength(5)]], 
            GroupByLabels: [false],
            showCheckLists: [false],
            showDescription: [false],
            showComments: [false]
        }
        control.push(this.formBuilder.group(reportedList));
    }

    moveReportedList(i: number, position: number) {
        
    }

    removeReportedList(i: number) {
        const control = <FormArray>this.settingsForm.controls['reportedLists'];
        control.removeAt(i)
    }

    private subscribeToFormChanges() {
        const myFormStatusChanges$ = this.settingsForm.statusChanges;
        const myFormValueChanges$ = this.settingsForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }
}