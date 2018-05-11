import { Injectable } from '@angular/core';


import { Event ,NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ToolbarLoadingIndicatorService {

  public isLoader = new Subject <boolean>(); // a subject that will determine the new value of the loader true or false

  routerNavigationInterceptor (event : Event){ // Check the router events of the router

    if(event instanceof NavigationStart){

      this.isLoader.next(true); // pass the new data of the subject using next
      

    }
    else if(event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){

      setTimeout(() => { //set timeout to properly end the progress loader by 1s

        this.isLoader.next(false);

      }, 1000 );
       
    }

  }


}
