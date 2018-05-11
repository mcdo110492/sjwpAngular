import { Injectable } from '@angular/core';

import { Baptism } from './baptism.model';
import { Subject } from 'rxjs/Subject';


import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';


interface  IDataResponse {
  count : number;
  data  : Baptism[];
}


interface IStatusResponse {
  status  : number;
  message : string;
}


@Injectable()
export class BaptismService {

  baseUrl: string = environment.target;
  shared = new Subject<string>();
  constructor(private http : HttpClient) {}

  getDataSource(paginator,sort,filter) {
      const params = new HttpParams()
            .set('filter', filter)
            .append('limit', paginator.pageSize )
            .append('page', (paginator.pageIndex + 1) )
            .append('order', sort.direction || 'asc' )
            .append('field', sort.active || 'child_name');

      return this.http
                    .get<IDataResponse>(`${this.baseUrl}/baptism`,
                    { params : params } );

  }

  saveData(data : Baptism){
    return this.http
                    .post<IStatusResponse>(`${this.baseUrl}/baptism`,data);
  }

  getData(id : number){
    return this.http
                    .get<Baptism>(`${this.baseUrl}/baptism/${id}`);
  }


  updateData(data : Baptism){
    return this.http
                    .put<IStatusResponse>(`${this.baseUrl}/baptism/${data.baptism_id}`,data);
  }

 
}
