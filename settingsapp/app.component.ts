import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { AppSettings, ReportedList } from './settings.interface';
import { SettingsService } from './settings.service';

@Component({
    selector: 'Trello-4-Impl-Settings',
    templateUrl: 'settingsapp/app.component.html',
    styleUrls: ['settingsapp/app.component.css'],
    providers: [SettingsService]
})
export class AppComponent implements OnInit {
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
            reportedList: this.formBuilder.array([])
        });

        this.settingsService.getObservableSettings()
            .subscribe((data) => {
                console.dir(data);
                (<FormGroup>this.settingsForm)
                    .setValue(data, { onlySelf: true });
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
        const control = <FormArray>this.settingsForm.controls['reportedList'];
        let reportedList: ReportedList = {
            listName: listname,
            listId: listId,
            order: order, 
        }
        control.push(this.formBuilder.group(reportedList));
    }

    moveReportedList(i: number, position: number) {
        
    }

    removeReportedList(i: number) {
        const control = <FormArray>this.settingsForm.controls['reportedList'];
        control.removeAt(i)
    }

    private subscribeToFormChanges() {
        const myFormStatusChanges$ = this.settingsForm.statusChanges;
        const myFormValueChanges$ = this.settingsForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    

}