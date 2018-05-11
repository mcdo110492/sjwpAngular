import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { SalesIndividual, SalesByCategory } from './../sales-report.model';
import { SalesReportService } from './../sales-report.service';

import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { PdfService } from './../../../_services/pdf.service';

import * as moment from "moment";

@Component({
  selector: 'app-sales-report-print',
  templateUrl: './sales-report-print.component.html',
  styleUrls: ['./sales-report-print.component.scss']
})
export class SalesReportPrintComponent implements OnInit {

  salesIndividual : SalesIndividual[] = [];
  salesCategories : SalesByCategory[] = [];
  totalSales      : number            = 0;
  currentDate     : Date              = new Date();


  constructor(private _pdf : PdfService,
    private _route: ActivatedRoute,
    private _errHandle : ErrorHandlerService,
    private _service : SalesReportService) { }

  ngOnInit() {
    this.initDetails();
  }

  initDetails() {
    let from =  moment(this._route.snapshot.paramMap.get('from')).format('MMMM D, YYYY');
    let to   = moment(this._route.snapshot.paramMap.get('to')).format('MMMM D, YYYY');
    let type = +this._route.snapshot.paramMap.get('type');
    this._route.paramMap
      .switchMap((params : ParamMap) => 

       (+params.get('type') == 1)? this._service.getDataIndividual(params.get('from'),params.get('to'),'byIndividual') : this._service.getDataCategory(params.get('from'),params.get('to'),'byCategories')  
      
      )
      .subscribe((response) => { 
        (type == 1) ? this.salesIndividual = response.data : this.salesCategories = response.data;
        
        this.totalSales = response.totalSales;

         setTimeout(() => { this._pdf.generatePdfByAutotable('Sales List Report',`Date From: ${from} To ${to}`); },500);
      },
      (err) => { this._errHandle.errorHandler(err); });
  }

}
