import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { fadeInAnimation } from './_animations/fade-in-out.animation';


import { Router } from '@angular/router';
import { ToolbarLoadingIndicatorService } from './_services/toolbar-loading-indicator.service';


import { ToastsManager  } from 'ng2-toastr/ng2-toastr';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[fadeInAnimation]
})

export class AppComponent implements OnInit {
  loaderIndicator;
  routerIndicator;
  isLoaderShow: boolean;

  constructor(private toolbarLoadingIndicatorService : ToolbarLoadingIndicatorService,
              private router: Router,
              private toaster : ToastsManager,
              vRef : ViewContainerRef ){
                toaster.setRootViewContainerRef(vRef);
               }

  ngOnInit(){

    this.loaderIndicator = this.toolbarLoadingIndicatorService.isLoader.subscribe(loader => this.isLoaderShow = loader);

    this.routerIndicator = this.router.events.subscribe(ev => this.toolbarLoadingIndicatorService.routerNavigationInterceptor(ev));
  }


  prepRouteState(outlet : any ){
    return outlet.activatedRouteData['animation'];
  }


 


}
