import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';


import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';


import { MdPaginator , MdSort } from '@angular/material';

import { DeathService } from './death.service';

import { Death } from './death.model';


import { TableDataSourceService } from './../../_services/table-data-source.service';
import { TableDatabaseService } from './../../_services/table-database.service';
import { ErrorHandlerService } from './../../_services/error-handler.service';
import { ProgressDialogService } from './../../_services/progress-dialog.service';

@Component({
  selector: 'app-death',
  templateUrl: './death.component.html'
})
export class DeathComponent implements OnInit, OnDestroy {

  // Child Elements variables Angular Material 2 Paginator and Sort
  @ViewChild( MdSort ) sort: MdSort;
  @ViewChild( MdPaginator ) paginator: MdPaginator;

  searchFilter : string = '';
  latestSearchFilter = new Subject<string>();

  // Table Options
  displayedColumns = ['deceased_name', 'date_death', 'place_burial','date_burial' ,'book_no', 'page_no','entry_no','minister','action'];
  dataSource : TableDataSourceService | null;
  

  //Angular Material 2 Paginator Options
  pageDataLength : number;
  pageSizeOptions : number[] = [5,10,25,50,100];
  pageSize : number = 5;
  pageIndex : number = 0;  
  
  constructor(private _deathService : DeathService,
              private _tableDatabaseService : TableDatabaseService ,
              private _errHandler : ErrorHandlerService,
              private _loader : ProgressDialogService){}

  ngOnInit() {

    this.initData();

    this.dataSource = new TableDataSourceService (this._tableDatabaseService);

    this.latestSearchFilter
        .debounceTime(300)
        .switchMap( search => this._deathService.getDataSource(this.paginator,this.sort,search) )
        .subscribe( response => {
            this._tableDatabaseService.tableDataStream$.next(response.data);
        },
        (err) => { this._errHandler.errorHandler(err); });
  }

  //Load Initial Data 
  initData(){

    //Override Inittial Paginator Default Values
    const initPaginator = {
      pageSize    : this.pageSize,
      pageIndex   : this.pageIndex,
    };

    this._loader.openSpinner(); // Dialog Progress Spinner

    this._deathService.getDataSource(initPaginator,this.sort,this.searchFilter)
        .subscribe( response => {
            this._tableDatabaseService.tableDataStream$.next(response.data);
            this.pageDataLength = response.count;
            this._loader.closeSpinner();
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
  }



  //Method that captures the Angular Material 2 Paginator Event and Sort Event
  tableChangeEvent(){

    this.latestSearchFilter.next(this.searchFilter);

  }

  //Track By Method of the Angular Material Data Table
  tableTrackBy = (index : number, item: Death) => {
    return item.death_id;
  }

  //Method in Every new Filter
  newSearchFilter(term) {
    this.latestSearchFilter.next(term);
  }


  
  ngOnDestroy(){
    this.latestSearchFilter.unsubscribe();
  }

}
