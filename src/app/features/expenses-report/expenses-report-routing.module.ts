import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { ExpensesReportComponent } from './expenses-report.component';
import { ExpensesReportPrintComponent } from './expenses-report-print/expenses-report-print.component';

const routes: Routes = [
  { path: '', component: ExpensesReportComponent, data:{ animation:'expenses/report' }, canActivate:[AuthGuardStateService] },
  { path: 'print/:from/:to/:type' , component: ExpensesReportPrintComponent, data:{ animation:'expenses/report/print' }, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesReportRoutingModule { }
