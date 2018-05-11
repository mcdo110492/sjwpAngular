import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { Pos, ServiceItems } from './../pos/pos.model';
import { SalesItemDialogComponent } from './sales-item-dialog/sales-item-dialog.component';

import { environment } from './../../../environments/environment.prod';


interface  IDataResponse {
  count : number;
  data  : Pos[];
}

interface  IDataResponsePrint {
  netCost   : number;
  data      : Pos[];
}

interface ISalesItemResponse {
  data : ServiceItems[];
}

interface IStatusResponse {
  status  : number;
  message : string;
}


@Injectable()
export class SalesService {

  baseUrl: string = environment.target;
  
    constructor(private http : HttpClient, private _dialog : MdDialog) {}
  
    getDataSource(paginator,sort,filter, dateIssued) {
          const data = {
            filter : filter,
            limit : paginator.pageSize,
            page : paginator.pageIndex,
            order : sort.direction || 'asc',
            field : sort.active || 'rrNo',
            dateIssued : dateIssued
          }
  
        return this.http
                      .post<IDataResponse>(`${this.baseUrl}/sales/list`,data);
  
    }

    getData(dateIssued){
      const data = { dateIssued : dateIssued };
      return this.http 
                 .post<IDataResponsePrint>(`${this.baseUrl}/sales/print`,data);
    }


    changeStatus(id :number , status : number){
      const data = {
            serviceSalesId : id,
            status         : status
      };

      return this.http
                     .post<IStatusResponse>(`${this.baseUrl}/sales/status`,data);
    }

    getItems(id : number){

      return this.http  
                      .get<ISalesItemResponse>(`${this.baseUrl}/sales/items/${id}`);

    }

    openItemsDialog(data : ServiceItems[],rrNo : number,total : number){

     let dialogRef : MdDialogRef<SalesItemDialogComponent>;

     let dialogConfig : MdDialogConfig = {
        disableClose : false,
        height: '400px',
        width: '600px',
        data: {
          items : data,
          rrNo  : rrNo,
          total : total
        }
      };

      dialogRef = this._dialog.open(SalesItemDialogComponent,dialogConfig);

      return dialogRef.afterClosed();
 

    }



}
