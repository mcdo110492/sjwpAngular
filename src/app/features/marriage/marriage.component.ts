import { Component, OnInit, OnDestroy ,ViewChild } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';


import { MdPaginator , MdSort } from '@angular/material';

import { Marriage } from './marriage.model';

import { MarriageService } from './marriage.service';

import { TableDataSourceService } from './../../_services/table-data-source.service';
import { TableDatabaseService } from './../../_services/table-database.service';
import { ProgressDialogService } from './../../_services/progress-dialog.service'; 
import { ErrorHandlerService } from './../../_services/error-handler.service';


@Component({
  selector: 'app-marriage',
  templateUrl: './marriage.component.html',
  styleUrls: ['./marriage.component.scss']
})
export class MarriageComponent implements OnInit, OnDestroy {

  // Child Elements variables Angular Material 2 Paginator and Sort
  @ViewChild( MdSort ) sort: MdSort;
  @ViewChild( MdPaginator ) paginator: MdPaginator;


  searchFilter : string = '';
  latestSearchFilter = new Subject<string>();

  // Table Options
  displayedColumns = ['husband_name', 'wife_name', 'date_married' ,'book_no', 'page_no', 'entry_no','minister','action'];
  dataSource : TableDataSourceService | null;
  

  //Angular Material 2 Paginator Options
  pageDataLength : number;
  pageSizeOptions : number[] = [5,10,25,50,100];
  pageSize : number = 5;
  pageIndex : number = 0;  
  
  constructor(private _marriageService : MarriageService,
              private _tableDatabaseService : TableDatabaseService ,
              private _errHandler : ErrorHandlerService, 
              private _loader : ProgressDialogService){}

  ngOnInit() {

    

    this.initData();

    this.dataSource = new TableDataSourceService (this._tableDatabaseService);

    this.latestSearchFilter
        .debounceTime(300)
        .switchMap( search => this._marriageService.getDataSource(this.paginator,this.sort,search) )
        .subscribe( response => {
            this._tableDatabaseService.tableDataStream$.next(response.data);
        },
        (err) => this._errHandler.errorHandler(err)
        );
  }

  //Load Initial Data 
  initData(){

    this._loader.openSpinner();
    //Override Inittial Paginator Default Values
    const initPaginator = {
      pageSize    : this.pageSize,
      pageIndex   : this.pageIndex,
    };


     this._marriageService.getDataSource(initPaginator,this.sort,this.searchFilter)
        .subscribe( response => {
            this._tableDatabaseService.tableDataStream$.next(response.data);
            this.pageDataLength = response.count;
            this._loader.closeSpinner();
            
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });



  }

  tableTrackBy = (index : number, item: Marriage) => {
    return item.marriage_id;
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
