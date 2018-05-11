import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';

import { UserProfileUsername, UserProfilePassword } from './user-profile.model';

interface IStatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class UserProfileService {

  baseUrl: string = environment.target;

  constructor(private _http : HttpClient) { }

  changeUsername(data : UserProfileUsername){
    return this._http.post<IStatusResponse>(`${this.baseUrl}/user/profile/username`,data);
  }

  changePassword(data : UserProfilePassword ){
    return this._http.post<IStatusResponse>(`${this.baseUrl}/user/profile/password`,data);
  }


}
