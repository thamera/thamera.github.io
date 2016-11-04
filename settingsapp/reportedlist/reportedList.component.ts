import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'reportedList',
    templateUrl: 'reportedlist.component.html'
})
export class ReportedListComponent {
    // Pass in reportedlist from App component
    @Input('group')
    public reportedListForm: FormGroup;
}