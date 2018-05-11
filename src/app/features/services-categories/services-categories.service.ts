import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { ServicesCategories } from './services-categories.model';

import { environment } from './../../../environments/environment.prod';

interface  IDataResponse {
  count : number;
  data  : ServicesCategories[];
}


interface IStatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class ServicesCategoriesService {

  baseUrl : string = environment.target;

  constructor(private _http : HttpClient) { }

  getDataSource(paginator,sort,filter){
    const params = new HttpParams()
          .set('filter', filter)
          .append('limit', paginator.pageSize )
          .append('page', (paginator.pageIndex + 1) )
          .append('order', sort.direction || 'asc' )
          .append('field', sort.active || 'serviceCategoryName');

          return this._http.get<IDataResponse>(`${this.baseUrl}/services/categories`,{ params: params });
  }

  save(data : ServicesCategories){
    return this._http.post<IStatusResponse>(`${this.baseUrl}/services/categories`,data);
  }

  getData(id : number){
    return this._http.get<ServicesCategories>(`${this.baseUrl}/services/categories/${id}`);
  }


  update(data : ServicesCategories){
    return this._http.put<IStatusResponse>(`${this.baseUrl}/services/categories/${data.serviceCategoryId}`,data);
  }

}
