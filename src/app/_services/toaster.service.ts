import { Injectable } from '@angular/core';

import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class ToasterService {

  constructor(private _toaster : ToastsManager, private _toastOption : ToastOptions) { 
    this._toastOption.animate = 'flyLeft';
    this._toastOption.newestOnTop = true;
    this._toastOption.showCloseButton = true;

  }

  showSuccess(){
    this._toaster.success('Transaction has been saved.','SUCCESS');
  }

  showError(){
    this._toaster.error("There' s an error occured.","ERROR");
  }

  showCustom(type : string, title : string, msg : string){
    switch (type) {

      case "success":
        this._toaster.success(msg,title);
        break;

      case "error":
        this._toaster.error(msg,title);
        break;

      case "warning":
        this._toaster.warning(msg,title);
        break;

      case "info":
        this._toaster.info(msg,title);
        break;

    }
  }



}
