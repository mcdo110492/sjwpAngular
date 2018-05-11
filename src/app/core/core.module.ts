import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HTTP_INTERCEPTORS } from '@angular/common/http';

// This for the Router Loader at the top of the Toolbar
import { ToolbarLoadingIndicatorService } from './../_services/toolbar-loading-indicator.service';

// Angular Material Dialog Service with Md Spinner to open and close the loader spinner
import { ProgressDialogService } from './../_services/progress-dialog.service';
// Angular Material Dialog Service for Confirmation Dialog with dyanmic data content
import { ConfirmDialogService } from './../_services/confirm-dialog.service';

//Route Authentication Guard and Authetication Login
import { AuthGuardStateService } from './../_services/auth-guard-state.service';
import { AuthenticationService } from './../_services/authentication.service';

// Http Client Interceptor to mutate the request before passing to the backend
import { NoopInterceptor } from './../_services/noop-interceptor.service';

//Error Handler for every Http Response
import { ErrorHandlerService } from './../_services/error-handler.service';

import { ToasterService } from './../_services/toaster.service';

// Table Data Source and Database Shared in the entire App
import { TableDataSourceService } from './../_services/table-data-source.service';
import { TableDatabaseService } from './../_services/table-database.service';

//Master Data Services that will be shared in the entire App
import { MasterDataService } from './../_services/master-data.service';

//PDF Services by jspdf and html2pdf
import { PdfService } from './../_services/pdf.service';

//Print Receipt Services by jspdf and html2pdf
import { PrintReceiptDialogService } from './../_services/print-receipt-dialog.service';

//Print Receipt Services by jspdf and html2pdf
import { NumberToWordsService } from './../_services/number-to-words.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ToolbarLoadingIndicatorService,
    ProgressDialogService,
    ConfirmDialogService,
    AuthGuardStateService,
    AuthenticationService, 
    ErrorHandlerService,
    TableDataSourceService,
    TableDatabaseService,
    ToasterService,
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    MasterDataService,
    PdfService,
    PrintReceiptDialogService,
    NumberToWordsService
  ],
})

//Core Module for the Services
export class CoreModule { 

  constructor(@Optional() @SkipSelf() parentModule : CoreModule) {
    if(parentModule){
      throw new Error(
        'Core Module is already loaded. Only Import it in the Root App Module.'
      );
    }
  }

}
