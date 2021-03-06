import { Component, OnInit, OnDestroy ,ViewChild } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import { MdPaginator , MdSort } from '@angular/material';

import { Baptism } from './baptism.model';

import { BaptismService } from './baptism.service';

import { TableDataSourceService } from './../../_services/table-data-source.service';
import { TableDatabaseService } from './../../_services/table-database.service';
import { ProgressDialogService } from './../../_services/progress-dialog.service'; 
import { ErrorHandlerService } from './../../_services/error-handler.service';



@Component({
  selector: 'app-baptism',
  templateUrl: './baptism.component.html'
})

export class BaptismComponent implements OnInit, OnDestroy {

  // Child Elements variables Angular Material 2 Paginator and Sort
  @ViewChild( MdSort ) sort: MdSort;
  @ViewChild( MdPaginator ) paginator: MdPaginator;




  searchFilter : string = '';
  latestSearchFilter = new Subject<string>();

  // Table Options
  displayedColumns = ['child_name', 'birthday', 'baptism_date' ,'book_no', 'page_no', 'entry_no','minister','action'];
  dataSource : TableDataSourceService | null;
  

  //Angular Material 2 Paginator Options
  pageDataLength : number;
  pageSizeOptions : number[] = [5,10,25,50,100];
  pageSize : number = 5;
  pageIndex : number = 0;  
  
  constructor(private _baptismService : BaptismService,
              private _tableDatabaseService : TableDatabaseService ,
              private _errHandler : ErrorHandlerService, 
              private _loader : ProgressDialogService){}

  ngOnInit() {

    

    this.initData();

    this.dataSource = new TableDataSourceService (this._tableDatabaseService);

    this.latestSearchFilter
        .debounceTime(300)
        .switchMap( search => this._baptismService.getDataSource(this.paginator,this.sort,search) )
        .subscribe( response => {
            this._tableDatabaseService.tableDataStream$.next(response.data);
        },
        (err) => this._errHandler.errorHandler(err)
        );
  }

  //Load Initial Data 
  initData(){

   

    //Override Inittial Paginator Default Values
    const initPaginator = {
      pageSize    : this.pageSize,
      pageIndex   : this.pageIndex,
    };

    this._loader.openSpinner(); // Dialog Progress Spinner


     this._baptismService.getDataSource(initPaginator,this.sort,this.searchFilter);
        .subscribe( response => {
            this._tableDatabaseService.tableDataStream$.next(response.data);
            this.pageDataLength = response.count;
            this._loader.closeSpinner()
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });



  }

  tableTrackBy = (index : number, item: Baptism) => {
    return item.baptism_id;
  }



  //Method that captures the Angular Material 2 Paginator Event and Sort Event
  tableChangeEvent(){

    this.latestSearchFilter.next(this.searchFilter);

  }

  //Method in Every new Filter
  newSearchFilter(term) {
    this.latestSearchFilter.next(term);
  }



  
  ngOnDestroy(){
    this.latestSearchFilter.unsubscribe();
  }

 
}





