import { Injectable } from '@angular/core';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { PrintReceiptDialogComponent } from './../main/print-receipt-dialog/print-receipt-dialog.component';

@Injectable()
export class PrintReceiptDialogService {

  dialogRef : MdDialogRef<PrintReceiptDialogComponent>

 constructor(private _dialog : MdDialog) { }

 openPrint(dataContent : any){

    let dialogConfig : MdDialogConfig = {
      disableClose : false,
      data: dataContent,
      width : '800px'
    };

    this.dialogRef = this._dialog.open(PrintReceiptDialogComponent,dialogConfig);

    return this.dialogRef.afterClosed();
 
   
 }


 closePrint(){
   this.dialogRef.close();
 }


}
