import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExpensesIndividual, ExpensesByCategory } from './expenses-report.model';

import { ExpensesReportService } from './expenses-report.service';

import { ProgressDialogService } from './../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../_services/error-handler.service';

import * as moment from "moment";

@Component({
  selector: 'app-expenses-report',
  templateUrl: './expenses-report.component.html',
  styleUrls: ['./expenses-report.component.scss']
})
export class ExpensesReportComponent implements OnInit {

  expensesIndividual : ExpensesIndividual[] = [];
  expensesCategories : ExpensesByCategory[] = [];
  netCosts : number = 0;
  dateFilterEvent:any;
  constructor(private _service : ExpensesReportService,
              private _errorHandler : ErrorHandlerService,
              private _loader : ProgressDialogService,
              private _router : Router) { }

  ngOnInit() {
  }

  reportEventFn(data : any){
      this._loader.openSpinner();
      this.dateFilterEvent = data;
      let from = moment(data.from).format('YYYY-MM-D');
      let to   = moment(data.to).format('YYYY-MM-D');
      let type = data.type;
      if(type === 'byIndividual'){
        this.expensesCategories = [];
        this._service.getDataIndividual(from,to,type)
        .subscribe( (response) => {
         this.expensesIndividual = response.data; 
         this.netCosts = response.netCosts;
         this._loader.closeSpinner();
        },(err) => { this._errorHandler.errorHandler(err); this._loader.closeSpinner(); });
      }
      else{
        this.expensesIndividual = [];
        this._service.getDataCategory(from,to,type)
        .subscribe( (response) => {
         this.expensesCategories = response.data; 
         this.netCosts = response.netCosts;
         this._loader.closeSpinner();
        },(err) => { this._errorHandler.errorHandler(err); this._loader.closeSpinner(); });
      }

  }

  print(index : number){
    let from = moment(this.dateFilterEvent.from).format('YYYY-MM-D');
    let to   = moment(this.dateFilterEvent.to).format('YYYY-MM-D'); 
    if(index == 1){
      this._router.navigateByUrl(`/main/expenses/report/print/${from}/${to}/1`);
    }
    else{
      this._router.navigateByUrl(`/main/expenses/report/print/${from}/${to}/2`);
    }
  }


}
