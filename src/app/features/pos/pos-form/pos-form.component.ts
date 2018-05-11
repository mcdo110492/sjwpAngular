import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServicesType } from './../../services-type/services-type.model';

import { PosService } from './../pos.service';

import { ConfirmDialogService } from './../../../_services/confirm-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { PrintReceiptDialogService } from './../../../_services/print-receipt-dialog.service';

@Component({
  selector: 'app-pos-form',
  templateUrl: './pos-form.component.html'
})
export class PosFormComponent implements OnInit,OnChanges {

  @Input() services : ServicesType[];
  @Input() totalPrice : number = 0;
  @Output() cash  = new EventEmitter<number>();
  @Output() saveProgress = new EventEmitter<boolean>();
  currentDate : Date = new Date();
  posForm : FormGroup

  constructor(private _fb : FormBuilder,
              private _confirm : ConfirmDialogService,
              private _service : PosService,
              private _toaster : ToasterService,
              private _errHandler : ErrorHandlerService,
              private _loader : ProgressDialogService,
              private _receipt : PrintReceiptDialogService) {
      this.createForm();
   }

  ngOnInit() {}

  ngOnChanges(){
    this.posForm.patchValue({
      totalCost : this.totalPrice
    });
  }


  createForm(){

    this.posForm = this._fb.group({
      rrNo          : [null,[Validators.required,Validators.minLength(1)]],
      amountPaid    : [null,[Validators.required,Validators.minLength(1)]],
      customer      : [null],
      totalCost     : [null]
    });
  }

  logCashFn() {

    let val = this.posForm.get('amountPaid').value;
    this.cash.emit(val);
  }


  savePos(){
    const confirm = this._confirm.openConfirm('Would you like to complete this transaction?');
    confirm.subscribe((res) => {
      const pos = {
            details : this.posForm.value,
            items   : this.services
      };
      this._loader.openSpinner();
      this._service.storeItems(pos)
          .subscribe((res) => {
              this._loader.closeSpinner();
              if(res.status == 200){
                const data = {
                      rrNo       : this.posForm.get('rrNo').value,
                      amountPaid : this.posForm.get('amountPaid').value,
                      customer   : this.posForm.get('customer').value,
                      totalPrice : this.totalPrice
                };
                this._receipt.openPrint(data);
                this.posForm.reset();
                this.services = [];
                this.totalPrice = 0;
                this.saveProgress.emit(true);
              }
              
          },
          (err) => {
            this._errHandler.errorHandler(err);
            this._loader.closeSpinner();
            this.saveProgress.emit(false);
          });
    });

    
  }

}
