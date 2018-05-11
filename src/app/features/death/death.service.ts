import { Injectable } from '@angular/core';

import { Death } from './death.model';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';


interface  IDataResponse {
  count : number;
  data  : Death[];
}

interface IStatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class DeathService {

  baseUrl: string = environment.target;

  constructor(private http : HttpClient) {}

  getDataSource(paginator,sort,filter) {
      const params = new HttpParams()
            .set('filter', filter)
            .append('limit', paginator.pageSize )
            .append('page', (paginator.pageIndex + 1) )
            .append('order', sort.direction || 'asc' )
            .append('field', sort.active || 'deceased_name');

      return this.http
                    .get<IDataResponse>(`${this.baseUrl}/death`,
                    { params : params } );

  }

  saveData(data : Death){
    return this.http
                    .post<IStatusResponse>(`${this.baseUrl}/death`,data);
  }

  getData(id : number){
    return this.http
                    .get<Death>(`${this.baseUrl}/death/${id}`);
  }


  updateData(data : Death){
    return this.http
                    .put<IStatusResponse>(`${this.baseUrl}/death/${data.death_id}`,data);
  }

}
