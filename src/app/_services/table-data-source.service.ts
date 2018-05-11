import { Injectable } from '@angular/core';

import { DataSource } from '@angular/cdk/collections';

import { Observable } from 'rxjs/Observable';

import { TableDatabaseService } from './table-database.service';


@Injectable()
export class TableDataSourceService extends DataSource<any> {

  constructor(private databaseService : TableDatabaseService) { 
    super();
  }

  //Connect to the Table and return the Data that emit by the Observable in the TableDatabaseService tableDataStream$
  connect (): Observable<any[]> {
    return this.databaseService.tableDataStream$;
  }

  disconnect() {
     this.databaseService.tableDataStream$.next([]);
  }

}
