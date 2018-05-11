import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { ExpensesComponent } from './expenses.component';
import { ExpensesCreateComponent } from './expenses-create/expenses-create.component';
import { ExpensesEditorComponent } from './expenses-editor/expenses-editor.component';
import { ExpensesPrintComponent } from './expenses-print/expenses-print.component';

const routes: Routes = [
  { path: '', component: ExpensesComponent, data:{ animation:'expense/list' }, canActivate:[AuthGuardStateService] },
  { path: 'create', component: ExpensesCreateComponent, data:{ animation:'expense/create' }, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: ExpensesEditorComponent, data:{ animation:'expense/detail' }, canActivate:[AuthGuardStateService] },
  { path: 'print/report/:dateExpense', component: ExpensesPrintComponent, data:{ animation:'expense/print' }, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
