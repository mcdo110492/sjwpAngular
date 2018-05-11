import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { SalesComponent } from './sales.component';
import { SalesPrintComponent } from './sales-print/sales-print.component';

const routes: Routes = [
  { path: '', component: SalesComponent, data:{ animation : 'sales/list' }, canActivate:[AuthGuardStateService] },
  { path: 'print/report/:dateIssued', component: SalesPrintComponent, data:{ animation : 'sales/print/report' }, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
