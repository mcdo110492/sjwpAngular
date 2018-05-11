import { Injectable } from '@angular/core';

import { Minister } from './minister.model';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';


interface  IDataResponse {
  count : number;
  data  : Minister[];
}

interface IStatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class MinisterService {

  baseUrl: string = environment.target;

  constructor(private http : HttpClient) {}

  getDataSource(paginator,sort,filter) {
      const params = new HttpParams()
            .set('filter', filter)
            .append('limit', paginator.pageSize )
            .append('page', (paginator.pageIndex + 1) )
            .append('order', sort.direction || 'asc' )
            .append('field', sort.active || 'minister_name');

      return this.http
                    .get<IDataResponse>(`${this.baseUrl}/minister`,
                    { params : params } );

  }

  changeStatus(id : number , status : number){
    const data = {
      minister_id : id,
      status : status
    };

    return this.http
               .post<IStatusResponse>(`${this.baseUrl}/minister/status`,data);
  }

  saveData(data : Minister){
    return this.http
                    .post<IStatusResponse>(`${this.baseUrl}/minister`,data);
  }

  getData(id : number){
    return this.http
                    .get<Minister>(`${this.baseUrl}/minister/${id}`);
  }


  updateData(data : Minister){
    return this.http
                    .put<IStatusResponse>(`${this.baseUrl}/minister/${data.minister_id}`,data);
  }

}
