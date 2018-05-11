import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { TitleBarModule } from './../title-bar/title-bar.module';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';

import { SalesService } from './sales.service';
import { SalesItemDialogComponent } from './sales-item-dialog/sales-item-dialog.component';
import { SalesPrintComponent } from './sales-print/sales-print.component';

@NgModule({
  imports: [
    SharedModule,
    TitleBarModule,
    SalesRoutingModule
  ],
  declarations: [SalesComponent, SalesItemDialogComponent, SalesPrintComponent],
  providers:[SalesService],
  entryComponents:[SalesItemDialogComponent]
})
export class SalesModule { }
