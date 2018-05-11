import { Injectable } from '@angular/core';

import { Confirmation } from './confirmation.model';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';


interface  IDataResponse {
  count : number;
  data  : Confirmation[];
}

interface IStatusResponse {
  status  : number;
  message : string;
}


@Injectable()
export class ConfirmationService {

  baseUrl: string = environment.target;

  constructor(private http : HttpClient) {}

  getDataSource(paginator,sort,filter) {
      const params = new HttpParams()
            .set('filter', filter)
            .append('limit', paginator.pageSize )
            .append('page', (paginator.pageIndex + 1) )
            .append('order', sort.direction || 'asc' )
            .append('field', sort.active || 'child_name');

      return this.http
                    .get<IDataResponse>(`${this.baseUrl}/confirmation`,
                    { params : params } );

  }

  saveData(data : Confirmation){
    return this.http
                    .post<IStatusResponse>(`${this.baseUrl}/confirmation`,data);
  }

  getData(id : number){
    return this.http
                    .get<Confirmation>(`${this.baseUrl}/confirmation/${id}`);
  }


  updateData(data : Confirmation){
    return this.http
                    .put<IStatusResponse>(`${this.baseUrl}/confirmation/${data.confirmation_id}`,data);
  }

 
}
