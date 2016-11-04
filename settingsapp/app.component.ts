import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AppSettings } from './settings.interface';

@Component({
    selector: 'Trello-4-Impl-Settings',
    templateUrl: 'settingsapp/app.component.html',
    styleUrls: ['settingsapp/app.component.css'],
    providers: []
})
export class AppComponent implements OnInit {
    title = 'Settings';
    public settingsForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    private Promise = TrelloPowerUp.Promise;
    private t: TrelloIFrame = TrelloPowerUp.iframe();
    //test: AbstractControl;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.settingsForm = this.formBuilder.group({
            test: ['TESTING', [Validators.required, Validators.minLength(5)]],
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
                    .then(function ([settings]) {
                        if (settings) {
                            //(<FormGroup>this.settingsForm)
                            //.setValue(existingSettings, { onlySelf: true });
                            console.log(settings);
                        }
                    })
                    .then(function () {
                        //t.sizeTo('#content')
                        //    .done();
                    })
            });
        }

        // subscribe to form changes  
        this.subscribeToFormChanges();

        // Update single value
        (<FormControl>this.settingsForm.controls['test'])
            .setValue('Test2', { onlySelf: true });
    }

    subscribeToFormChanges() {
        const myFormStatusChanges$ = this.settingsForm.statusChanges;
        const myFormValueChanges$ = this.settingsForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    onSubmit(model: AppSettings, isValid: boolean): void {
        this.submitted = true;
        console.log(model, isValid);
        if (this.t) {
            this.t.set('board', 'shared', 'settings', model)
            //.then(function () {
            //    t.closePopup();
            //});
        }
    }
}