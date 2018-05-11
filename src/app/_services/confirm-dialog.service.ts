import { Injectable } from '@angular/core';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { ConfirmDialogComponent } from './../main/confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

  dialogRef : MdDialogRef<ConfirmDialogComponent>

 constructor(private _dialog : MdDialog) { }

 openConfirm(message : string){

    let dialogConfig : MdDialogConfig = {
      disableClose : false,
      data: { content : message }
    };

    this.dialogRef = this._dialog.open(ConfirmDialogComponent,dialogConfig);

    return this.dialogRef.afterClosed();
 
   
 }


 closeSpinner(){
   this.dialogRef.close();
 }


}
