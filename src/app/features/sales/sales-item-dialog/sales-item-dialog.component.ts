import { Component, OnInit, Inject } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';
import { MD_DIALOG_DATA } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { ServiceItems } from './../../pos/pos.model';

@Component({
  selector: 'app-sales-item-dialog',
  templateUrl: './sales-item-dialog.component.html'
})
export class SalesItemDialogComponent implements OnInit {

  displayedColumns = ['serviceName','serviceCost','serviceQty','totalPrice'];
  salesDatabase = new SalesDatabase();
  dataSource : SalesTableDataSource | null;

  constructor(@Inject(MD_DIALOG_DATA) public data : dataItems){}

  ngOnInit() {
    
      this.salesDatabase.dataChange.next(this.data.items);
      this.dataSource = new  SalesTableDataSource(this.salesDatabase);
 
  }

  getTotal(qty : number , price : number){
    const total = (+price * +qty);
    return total;
  }

}


interface dataItems {
  items : ServiceItems[];
  rrNo : number;
  total: number;
}

export class SalesDatabase {

  dataChange : BehaviorSubject<ServiceItems[]> = new BehaviorSubject<ServiceItems[]>([]);
  get data () : ServiceItems[]{ return this.dataChange.value };

}



export class SalesTableDataSource extends DataSource<any>{

    constructor(private _database : SalesDatabase){
      super();
    }

    connect() : Observable<ServiceItems[]> {
      return this._database.dataChange;
    }

    disconnect() {
      this._database.dataChange.unsubscribe();
    }

}