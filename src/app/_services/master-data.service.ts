import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment.prod';

import { Minister } from './../features/minister/minister.model';


interface IMinisterDataResponse {
  data : Minister[]
}


@Injectable()
export class MasterDataService {

  baseUrl: string = environment.target;

  constructor(private _http : HttpClient) { }

  getMinisters() {
    return this._http
                    .get<IMinisterDataResponse>(`${this.baseUrl}/minister/all`);
  }

  getActiveMinister() {
    return this._http
                    .get<IMinisterDataResponse>(`${this.baseUrl}/minister/active`);
  }

}
