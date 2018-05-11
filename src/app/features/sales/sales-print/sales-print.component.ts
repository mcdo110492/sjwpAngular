import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { Pos } from './../../pos/pos.model';

import { SalesService } from './../sales.service';

import { PdfService } from './../../../_services/pdf.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

import * as moment from "moment";

@Component({
  selector: 'app-sales-print',
  templateUrl: './sales-print.component.html',
  styleUrls: ['./sales-print.component.scss']
})
export class SalesPrintComponent implements OnInit {

  sales: Pos[] = [];
  netCost : number = 0;
  dateFilter;
  
  constructor(private _pdf : PdfService,
              private _route: ActivatedRoute,
              private _errHandle : ErrorHandlerService,
              private _service : SalesService) { }

  ngOnInit() {
    this.initDetails();
  }

  initDetails() {
    this.dateFilter =  moment(this._route.snapshot.paramMap.get('dateIssued')).format('MMMM D, YYYY');
    this._route.paramMap
      .switchMap((params : ParamMap) => this._service.getData(params.get('dateIssued')))
      .subscribe((response) => { 
        this.sales = response.data;
        this.netCost = response.netCost;
        setTimeout(() => { this._pdf.generatePdfByAutotable('Sales List Report',`Date : ${this.dateFilter}`); },500);
      },
      (err) => { this._errHandle.errorHandler(err); });
  }

}
