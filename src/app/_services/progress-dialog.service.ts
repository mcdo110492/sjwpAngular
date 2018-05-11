import { Injectable } from '@angular/core';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { ProgressDialogComponent } from './../main/progress-dialog/progress-dialog.component';

@Injectable()
export class ProgressDialogService {

   dialogRef : MdDialogRef<ProgressDialogComponent>
   dialogConfig : MdDialogConfig = {
     disableClose : true,
    
   }

  constructor(private _dialog : MdDialog) { }

  openSpinner(){

    setTimeout(() => {
      this.dialogRef = this._dialog.open(ProgressDialogComponent,this.dialogConfig);
    },0);
      
  }


  closeSpinner(){
    
    setTimeout(() => {
      this.dialogRef.close();
    },0);
    
  }

}
