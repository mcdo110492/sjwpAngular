import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ExpensesIndividual, ExpensesByCategory } from './../expenses-report.model';
import { ExpensesReportService } from './../expenses-report.service';

import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { PdfService } from './../../../_services/pdf.service';

import * as moment from "moment";

@Component({
  selector: 'app-expenses-report-print',
  templateUrl: './expenses-report-print.component.html',
  styleUrls: ['./expenses-report-print.component.scss']
})
export class ExpensesReportPrintComponent implements OnInit {

  expensesIndividual : ExpensesIndividual[] = [];
  expensesCategories : ExpensesByCategory[] = [];
  netCosts        : number            = 0;
  currentDate     : Date              = new Date();


  constructor(private _pdf : PdfService,
    private _route: ActivatedRoute,
    private _errHandle : ErrorHandlerService,
    private _service : ExpensesReportService) { }

  ngOnInit() {
    this.initDetails();
  }

  initDetails() {
    let from =  moment(this._route.snapshot.paramMap.get('from')).format('MMMM Do, YYYY');
    let to   = moment(this._route.snapshot.paramMap.get('to')).format('MMMM Do, YYYY');
    let type = +this._route.snapshot.paramMap.get('type');
    this._route.paramMap
      .switchMap((params : ParamMap) => 

       (+params.get('type') == 1)? this._service.getDataIndividual(params.get('from'),params.get('to'),'byIndividual') : this._service.getDataCategory(params.get('from'),params.get('to'),'byCategories')  
      
      )
      .subscribe((response) => { 
        (type == 1) ? this.expensesIndividual = response.data : this.expensesCategories = response.data;
        
        this.netCosts = response.netCosts;

         setTimeout(() => { this._pdf.generatePdfByAutotable('Expenses List Report',`Date From: ${from} To ${to}`); },500);
      },
      (err) => { this._errHandle.errorHandler(err); });
  }

}
