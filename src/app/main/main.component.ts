import { Component, OnInit, OnDestroy } from '@angular/core';


import { Subscription } from 'rxjs/Subscription';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import { slideInDownAnimation } from './../_animations/slide.animation';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations:[slideInDownAnimation]
})

export class MainComponent implements OnInit, OnDestroy {

  mediaWatcher : Subscription;
  sideNavOpen: boolean;
  sideNavMode: string;
  

 

  constructor(private media:ObservableMedia) {

      this.mediaWatcher = this.media.subscribe((change:MediaChange) => {
        setTimeout(() => {
          if ( change.mqAlias === 'xs') {
            this.loadMobileContent();
          }
          else{
            this.loadOriginalContent();
          }
        },0);
      });
  }

  ngOnInit() {

  }
  


  isOpenSideNav(){

    this.sideNavOpen = !this.sideNavOpen;

  }


  prepRouteChildState(outlet : any ){

    return outlet.activatedRouteData['animation'];

  }

  loadOriginalContent(){
    this.sideNavOpen = true;
    this.sideNavMode = 'side';
  }

  loadMobileContent(){
    this.sideNavOpen = false;
    this.sideNavMode = 'over';
  }

  ngOnDestroy(){
    this.mediaWatcher.unsubscribe();
  }



}
