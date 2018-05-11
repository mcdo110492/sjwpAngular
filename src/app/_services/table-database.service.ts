import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class TableDatabaseService {

  // Data Stream for the Angular Material Data Table 2 that will use by the Table Data Source
  tableDataStream$ : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);


}
