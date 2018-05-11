import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { superAdminMetaData, recordMetaData, accountingMetaData } from './sidenav.metadata';

@Injectable()
export class SidenavService {

  sidenavMetaDataStream$ : BehaviorSubject<any> = new BehaviorSubject<any>([]);

  getMetaData () {
    const obj   = JSON.parse(localStorage.presence || null);
    const role  = (obj) ? obj.role : 0;
    if(role == 1){
      this.sidenavMetaDataStream$.next(superAdminMetaData);
    }
    else if(role == 2) {
      this.sidenavMetaDataStream$.next(recordMetaData);
    }
    else if(role == 3){
      this.sidenavMetaDataStream$.next(accountingMetaData);
    }
  }

}
