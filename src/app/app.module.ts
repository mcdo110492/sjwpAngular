import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';


//Shared Module
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { ToastModule } from 'ng2-toastr/ng2-toastr';


//Routing Module
import { AppRoutingModule, PrimaryRouteComponents } from './app-routing.module';


//Eagerly Loaded Component
import { AppComponent } from './app.component';

//Core Module for the Global Services
import { CoreModule } from './core/core.module';
import { ProgressDialogComponent } from './main/progress-dialog/progress-dialog.component';
import { ConfirmDialogComponent } from './main/confirm-dialog/confirm-dialog.component';
import { PrintReceiptDialogComponent } from './main/print-receipt-dialog/print-receipt-dialog.component';






@NgModule({
  declarations: [
    AppComponent,
    PrimaryRouteComponents,
    ProgressDialogComponent,
    ConfirmDialogComponent,
    PrintReceiptDialogComponent
  ],
  entryComponents:[
    ProgressDialogComponent,
    ConfirmDialogComponent,
    PrintReceiptDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    ToastModule.forRoot()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
