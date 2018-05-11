import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment.prod';

import 'rxjs/add/operator/map';


interface Login {
  username : string;
  password : string;
}

interface LoginResponse {
  profileName? : string;
  profilePic? : string;
  role? : string;
  status : number;
  token? : string;
  error?  : string;
}



@Injectable()
export class AuthenticationService {

  baseUrl : string = environment.target;
  

  constructor(private _http : HttpClient) { }

  //The Authentication that connects to the backend to check the validity of the user token
  checkValidity()  {

      return this._http
          .get(`${this.baseUrl}/authenticate`)
          .map((res) => {
            return res;
          });
  }


  //Pass the Username and Password to the backend
  authenticateCredentials(credentials : Login){

      return this._http
                .post<LoginResponse>(`${this.baseUrl}/authenticate` , credentials);

  }





  

}
