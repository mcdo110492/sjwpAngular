import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { ExpensesTypeComponent } from './expenses-type.component';
import { ExpensesTypeCreateComponent } from './expenses-type-create/expenses-type-create.component';
import { ExpensesTypeEditorComponent } from './expenses-type-editor/expenses-type-editor.component';

const routes: Routes = [
  { path: '', component: ExpensesTypeComponent, data: { animation:'expenses/type' }, canActivate:[AuthGuardStateService] },
  { path: 'create', component: ExpensesTypeCreateComponent, data: { animation:'expenses/type/create' }, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: ExpensesTypeEditorComponent, data: { animation:'expenses/type/detail' }, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesTypeRoutingModule { }
