import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { TitleBarModule } from './../title-bar/title-bar.module';

import { ExpensesReportRoutingModule } from './expenses-report-routing.module';
import { ExpensesReportComponent } from './expenses-report.component';
import { ExpensesReportFormComponent } from './expenses-report-form/expenses-report-form.component';
import { ExpensesReportPrintComponent } from './expenses-report-print/expenses-report-print.component';

import { ExpensesReportService } from './expenses-report.service';

@NgModule({
  imports: [
    SharedModule,
    TitleBarModule,
    ExpensesReportRoutingModule
  ],
  declarations: [ExpensesReportComponent, ExpensesReportFormComponent, ExpensesReportPrintComponent],
  providers:[ExpensesReportService]
})
export class ExpensesReportModule { }
