import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

import { NumberToWordsService } from './../../_services/number-to-words.service';

@Component({
  selector: 'app-print-receipt-dialog',
  templateUrl: './print-receipt-dialog.component.html'
})
export class PrintReceiptDialogComponent implements OnInit {

  currentDate : Date = new Date();

  constructor(@Inject(MD_DIALOG_DATA) public data : any,
              private _numToWords : NumberToWordsService){}

  ngOnInit() {
  }

  numberToWords(number){
    return this._numToWords.numberToWords(number);
  }

  print(){
    let mywindow = window.open('', 'PRINT', 'height=400,width=800');
    
        mywindow.document.write('<html><head><title>Print Receipt</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(document.getElementById('print-area').innerHTML);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.print();
        mywindow.close();
  }



}
