import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { ServicesType } from './services-type.model';
import { ServicesCategories } from './../services-categories/services-categories.model';

import { environment } from './../../../environments/environment.prod';

interface  IDataResponse {
  count : number;
  data  : ServicesType[];
}


interface IStatusResponse {
  status  : number;
  message : string;
}



@Injectable()
export class ServicesTypeService {

  baseUrl : string = environment.target;
  
    constructor(private _http : HttpClient) { }
  
    getDataSource(paginator,sort,filter){
      const params = new HttpParams()
            .set('filter', filter)
            .append('limit', paginator.pageSize )
            .append('page', (paginator.pageIndex + 1) )
            .append('order', sort.direction || 'asc' )
            .append('field', sort.active || 'serviceName');
  
            return this._http.get<IDataResponse>(`${this.baseUrl}/services/type`,{ params: params });
    }

    getCategories(){
      return this._http.get<ServicesCategories[]>(`${this.baseUrl}/services/categories/all`);
    }
  
    save(data : ServicesType){
      return this._http.post<IStatusResponse>(`${this.baseUrl}/services/type`,data);
    }
  
    getData(id : number){
      return this._http.get<ServicesType>(`${this.baseUrl}/services/type/${id}`);
    }
  
  
    update(data : ServicesType){
      return this._http.put<IStatusResponse>(`${this.baseUrl}/services/type/${data.serviceId}`,data);
    }

}
