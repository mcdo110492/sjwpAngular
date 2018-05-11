import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { SalesIndividual, SalesByCategory } from './sales-report.model';

import { environment } from './../../../environments/environment.prod';



@Injectable()
export class SalesReportService {

  baseUrl : string = environment.target;

  constructor(private _http : HttpClient) { }

  getDataIndividual(from,to,type){
    const data = {
        from : from,
        to   :  to,
        type :  type
    };

    return this.getData(data);
  }

  getDataCategory(from,to,type){
    const data = {
        from : from,
        to   :  to,
        type :  type
    };

    return this.getData(data);
  }

  getData(data : any){
    return this._http.post<any>(`${this.baseUrl}/sales/report` ,data);
  }

}
