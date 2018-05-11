import { Injectable } from '@angular/core';

import { HttpClient, HttpRequest } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class FileUploadService {

  baseUrl : string = environment.target;
  constructor(private _http : HttpClient) { }

  uploadFile(dataFile,dataMinister,source){
      let formData = new FormData();
          formData.append('userFile',dataFile);
          formData.append('minister_id',dataMinister);

          // return this._http.post(`${this.baseUrl}/excel/import/source`,formData);

          const req = new HttpRequest('POST',`${this.baseUrl}/excel/import/${source}`,formData, {
            reportProgress : true,
          });

          return this._http.request(req);
  }

}
