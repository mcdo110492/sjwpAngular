import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expenses-report-form',
  templateUrl: './expenses-report-form.component.html'
})
export class ExpensesReportFormComponent implements OnInit {

  @Output() dateRequest = new EventEmitter<any>();
  
    currentDate = new Date();
    reportForm : FormGroup;
  
    constructor(private _fb : FormBuilder) { this.createForm();  }
  
    ngOnInit() {
    }
  
    createForm() {
      this.reportForm     = this._fb.group({
        from             : [null,Validators.required],
        to               : [null, Validators.required],
        type             : [null]
      });
    }
  
    byIndividual(){
      this.reportForm.patchValue({
        type    : 'byIndividual'
      });
  
      this.dateRequest.emit(this.reportForm.value);
      
    }
  
    byCategory(){
      this.reportForm.patchValue({
        type    : 'byCategory'
      });
  
      this.dateRequest.emit(this.reportForm.value);
      
    }

}
