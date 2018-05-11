import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Expenses } from './../expenses.model';

import { ExpensesService } from './../expenses.service';

import { PdfService } from './../../../_services/pdf.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

import * as moment from "moment";

@Component({
  selector: 'app-expenses-print',
  templateUrl: './expenses-print.component.html',
  styleUrls: ['./expenses-print.component.scss']
})
export class ExpensesPrintComponent implements OnInit {

  expenses: Expenses[] = [];
  netCost : number = 0;
  dateFilter;
  
  constructor(private _pdf : PdfService,
              private _route: ActivatedRoute,
              private _errHandle : ErrorHandlerService,
              private _service : ExpensesService) { }

  ngOnInit() {
    this.initDetails();
  }

  initDetails() {
    this.dateFilter =  moment(this._route.snapshot.paramMap.get('dateExpense')).format('MMMM D, YYYY');
    this._route.paramMap
      .switchMap((params : ParamMap) => this._service.getPrint(params.get('dateExpense')))
      .subscribe((response) => { 
        this.expenses = response.data;
        this.netCost = response.netCost;
        setTimeout(() => { this._pdf.generatePdfByAutotable('Expenses List Report',`Date : ${this.dateFilter}`); },500);
      },
      (err) => { this._errHandle.errorHandler(err); });
  }

}
