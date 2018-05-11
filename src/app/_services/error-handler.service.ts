import { Injectable } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

import { ToasterService } from './toaster.service';

@Injectable()
export class ErrorHandlerService {

  constructor(private _toastr : ToasterService) { }

  errorHandler(err : HttpErrorResponse) {

    if(err instanceof Error){

     this._toastr.showCustom('error','ERROR','Error encountered. Please refresh your browser.');
      
    }
    else {

        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        if(err.status == 500){
          this._toastr.showError();
        }
        else if(err.status == 422){
          this._toastr.showCustom('warning','UNPROCESSED REQUEST','Please make sure you correctly meet the form requirements.');
        }
        else{
          this._toastr.showCustom('error','Server Connection Error','Server is out of reach. Check your connection.');
        }
    }
    
  }

}
