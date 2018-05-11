import { Component, OnInit, OnDestroy } from '@angular/core';

import { SidenavService } from './sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  providers:[SidenavService]
})
export class SidenavComponent implements OnInit, OnDestroy {
  sideNavList;

  constructor(private _sidenavService : SidenavService) { }

  ngOnInit() {

    this._sidenavService.getMetaData();

    this.sideNavList = this._sidenavService.sidenavMetaDataStream$;

  }

  ngOnDestroy(){
    this._sidenavService.sidenavMetaDataStream$.unsubscribe();
  }


}
