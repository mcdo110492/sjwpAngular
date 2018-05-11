import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-sales-report-form',
  templateUrl: './sales-report-form.component.html',
  styleUrls: ['./sales-report-form.component.scss']
})
export class SalesReportFormComponent implements OnInit {

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
