import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Marriage } from './marriage.model';

import { environment } from './../../../environments/environment.prod';

interface  IDataResponse {
  count : number;
  data  : Marriage[];
}

interface IStatusResponse {
  status  : number;
  message : string;
}


@Injectable()
export class MarriageService {

  baseUrl: string = environment.target;
  
    constructor(private http : HttpClient) {}
  
    getDataSource(paginator,sort,filter) {
        const params = new HttpParams()
              .set('filter', filter)
              .append('limit', paginator.pageSize )
              .append('page', (paginator.pageIndex + 1) )
              .append('order', sort.direction || 'asc' )
              .append('field', sort.active || 'husband_name');
  
        return this.http
                      .get<IDataResponse>(`${this.baseUrl}/marriage`,
                      { params : params } );
  
    }

    saveData(data : Marriage){
      return this.http
                      .post<IStatusResponse>(`${this.baseUrl}/marriage`,data);
    }
  
    getData(id : number){
      return this.http
                      .get<Marriage>(`${this.baseUrl}/marriage/${id}`);
    }
  
  
    updateData(data : Marriage){
      return this.http
                      .put<IStatusResponse>(`${this.baseUrl}/marriage/${data.marriage_id}`,data);
    }

}
