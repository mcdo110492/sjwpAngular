import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';

import { ServicesType } from './../services-type/services-type.model';

interface IStatusResponse {
  status : number;
  message : string;
}

interface ICollectionResponse {
  collection : number;
}

@Injectable()
export class PosService {

  baseUrl : string = environment.target;

  constructor(private _http : HttpClient) { }

  getServices(filter : string){

    const params = new HttpParams()
          .set('filter', filter);

        return this._http.get<ServicesType[]>(`${this.baseUrl}/services/type/search`,{ params : params });
  }

  getTotalCollection(){

    return this._http.get<ICollectionResponse>(`${this.baseUrl}/sales/collection`);

  }

  storeItems(data){
    
    return this._http.post<IStatusResponse>(`${this.baseUrl}/sales`,data);

  }

}
