import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import { MdPaginator, MdSort } from '@angular/material';

import * as moment from "moment";

import { ExpensesService } from './expenses.service';

import { TableDataSourceService } from './../../_services/table-data-source.service';
import { TableDatabaseService } from './../../_services/table-database.service';
import { ProgressDialogService } from './../../_services/progress-dialog.service'; 
import { ErrorHandlerService } from './../../_services/error-handler.service';
import { ToasterService } from './../../_services/toaster.service';
import { PrintReceiptDialogService } from './../../_services/print-receipt-dialog.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnDestroy {

   // Child Elements variables Angular Material 2 Paginator and Sort
   @ViewChild( MdSort ) sort: MdSort;
   @ViewChild( MdPaginator ) paginator: MdPaginator;
 
   searchFilter : string = '';
   latestSearchFilter = new Subject<string>();
   currentDate  = new Date();
   dateFilter   : Date = this.currentDate;
 
   // Table Options
   displayedColumns = ['expenserrNo','expense','expenseCost','details','user','status','action'];
   dataSource : TableDataSourceService | null;
   
 
   //Angular Material 2 Paginator Options
   pageDataLength : number = 0;
   pageSizeOptions : number[] = [5,10,25,50,100];
   pageSize : number = 5;
   pageIndex : number = 0;  
   
   constructor(private _services : ExpensesService,
               private _tableDatabaseService : TableDatabaseService ,
               private _errHandler : ErrorHandlerService, 
               private _loader : ProgressDialogService,
               private _toaster : ToasterService,
               private _receipt : PrintReceiptDialogService,
               private _router : Router){}
 
   ngOnInit() {
                 
     this.dataSource = new TableDataSourceService (this._tableDatabaseService);
     
     this.initData();
 
     this.latestSearchFilter
         .debounceTime(300)
         .switchMap( search => this._services.getDataSource(this.paginator,this.sort,search,moment(this.dateFilter).format(this.dateFormat())) )
         .subscribe( response => {
             this.pageDataLength = response.count;
             this._tableDatabaseService.tableDataStream$.next(response.data);
         },(err) => this._errHandler.errorHandler(err));
   }
 
   initData(){
       this._loader.openSpinner();
     //Override Inittial Paginator Default Values
         const initPaginator = {
           pageSize    : this.pageSize,
           pageIndex   : this.pageIndex,
         };
         
     
          this._services.getDataSource(initPaginator,this.sort,this.searchFilter,moment(this.dateFilter).format(this.dateFormat()))
             .subscribe( response => {
                 this._tableDatabaseService.tableDataStream$.next(response.data);
                 this.pageDataLength = response.count;
                 this._loader.closeSpinner();
             },
             (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); }
           );
   
     
     }
 
    //Method that captures the Angular Material 2 Paginator Event and Sort Event
   tableChangeEvent(){  
     this.latestSearchFilter.next(this.searchFilter);
   }
     
   //Method in Every new Filter
   newSearchFilter(term) {
     this.latestSearchFilter.next(term);
   }
 
   changeStatus(id : number , status : number){
     this._loader.openSpinner();
     this._services.changeStatus(id,status)
                   .subscribe((res) => {
                     if(res.status == 200){
                       this._toaster.showCustom('success','Status Changed','The status has been changed successfully');
                       this.tableChangeEvent();
                     }
                     this._loader.closeSpinner();
                   },(err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
 
   }
 


   printReport(){
     let dateFilter = moment(this.dateFilter).format('YYYY-MM-D');
     this._router.navigateByUrl(`/main/expenses/list/print/report/${dateFilter}`);
   }
       
   ngOnDestroy(){
     this.latestSearchFilter.unsubscribe();
   }


    private dateFormat(): string {
        return 'MMMM Do YYYY';
    }
}
