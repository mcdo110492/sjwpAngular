import { Component, OnInit } from '@angular/core';

import { ServicesType } from './../services-type/services-type.model';

import { PosService } from './pos.service';

import { ToasterService } from './../../_services/toaster.service';
import { ErrorHandlerService } from './../../_services/error-handler.service';
import { ProgressDialogService } from './../../_services/progress-dialog.service';


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  
  selectedServices : ServicesType[] = [];
  totalItems : number = 0;
  totalPrice : number = 0;
  cash       : number = 0;
  cashChange : number = 0;
  totalCollection : number = 0;
  

  constructor(private _errHandler : ErrorHandlerService,
              private _toaster : ToasterService,
              private _loader : ProgressDialogService,
              private _service : PosService) { }

  ngOnInit() {
    this.totalCollectionFn();
  }

  addQty(index : number){
    this.selectedServices[index].serviceQty = this.selectedServices[index].serviceQty + 1;
    this.totalItems += 1;
    this.totalPrice += +this.selectedServices[index].cost;
    this.cashChange -= (this.cash) ? +this.selectedServices[index].cost : 0;
  }

  subtractQty(index : number){

    if(this.selectedServices[index].serviceQty > 1){
      this.selectedServices[index].serviceQty = this.selectedServices[index].serviceQty - 1;
      this.totalItems -= 1;
      this.totalPrice -= +this.selectedServices[index].cost;
      this.cashChange -= (this.cash) ? +this.selectedServices[index].cost : 0;
    }
    else{
      this._toaster.showCustom('info','Minimum Quantity','Item must have a minimum quantity of 1.');
    }
    
  }

  removeItem(index : number, item : ServicesType){
    this.totalItems -= +this.selectedServices[index].serviceQty;
    this.totalPrice -= (+this.selectedServices[index].cost * +this.selectedServices[index].serviceQty);
    this.cashChange += (this.cash) ? (+this.selectedServices[index].cost * +this.selectedServices[index].serviceQty) : 0;
    this.selectedServices.splice(index,1);
  }

  selectedItemFn(item : ServicesType){

    const isExist = this.selectedServices.findIndex( i => i.serviceId == item.serviceId );
    
    if(isExist == -1){
      item.serviceQty = 1;
      this.selectedServices.push(item);
      this.totalItems += 1;
      this.totalPrice += +item.cost;
    }
    else{
      this.selectedServices[isExist].serviceQty = this.selectedServices[isExist].serviceQty + 1;
      this.totalItems += 1;
      this.totalPrice += +item.cost;
    }

    console.log(item);
  }

  logCashFn(cash : number){
    this.cash = +cash;
    this.cashChange = (cash) ? this.cash - this.totalPrice : 0;
  }

  saveProgressFn(progress : boolean){

    if(progress){
      this.totalCollection += this.totalPrice;
      this.selectedServices = [];
      this.totalItems    = 0;
      this.totalPrice    = 0;
      this.cash          = 0;
      this.cashChange    = 0;
    }
    
  }

  totalCollectionFn(){
    this._service.getTotalCollection()
                  .subscribe((result) => {
                      this.totalCollection = +result.collection;
                  });
  }



}
