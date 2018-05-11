import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SalesIndividual, SalesByCategory } from './sales-report.model';

import { SalesReportService } from './sales-report.service';

import { ProgressDialogService } from './../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../_services/error-handler.service';

import * as moment from "moment";

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

  salesIndividual : SalesIndividual[] = [];
  salesCategories : SalesByCategory[] = [];
  totalSales : number = 0;
  dateFilterEvent:any;
  constructor(private _service : SalesReportService,
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
        this.salesCategories = [];
        this._service.getDataIndividual(from,to,type)
        .subscribe( (response) => {
         this.salesIndividual = response.data; 
         this.totalSales = response.totalSales;
         this._loader.closeSpinner();
        },(err) => { this._errorHandler.errorHandler(err); this._loader.closeSpinner(); });
      }
      else{
        this.salesIndividual = [];
        this._service.getDataCategory(from,to,type)
        .subscribe( (response) => {
         this.salesCategories = response.data; 
         this.totalSales = response.totalSales;
         this._loader.closeSpinner();
        },(err) => { this._errorHandler.errorHandler(err); this._loader.closeSpinner(); });
      }

  }

  print(index : number){
    let from = moment(this.dateFilterEvent.from).format('YYYY-MM-D');
    let to   = moment(this.dateFilterEvent.to).format('YYYY-MM-D'); 
    if(index == 1){
      this._router.navigateByUrl(`/main/sales/report/print/${from}/${to}/1`);
    }
    else{
      this._router.navigateByUrl(`/main/sales/report/print/${from}/${to}/2`);
    }
  }

}
