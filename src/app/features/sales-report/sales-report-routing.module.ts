import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { SalesReportComponent } from './sales-report.component';
import { SalesReportPrintComponent } from './sales-report-print/sales-report-print.component';

const routes: Routes = [
  { path: '', component: SalesReportComponent, data:{ animation :'sales/report' }, canActivate:[AuthGuardStateService] },
  { path: 'print/:from/:to/:type', component: SalesReportPrintComponent, data:{ animation :'sales/report/print' }, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesReportRoutingModule { }
