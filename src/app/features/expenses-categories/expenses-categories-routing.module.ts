import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { ExpensesCategoriesComponent } from './expenses-categories.component';
import { ExpensesCategoriesCreateComponent } from './expenses-categories-create/expenses-categories-create.component';
import { ExpensesCategoriesEditorComponent } from './expenses-categories-editor/expenses-categories-editor.component';

const routes: Routes = [
  { path: '', component: ExpensesCategoriesComponent, data:{ animation : 'expenses/list' }, canActivate:[AuthGuardStateService] },
  { path: 'create', component: ExpensesCategoriesCreateComponent, data:{ animation : 'expenses/create' }, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: ExpensesCategoriesEditorComponent, data:{ animation : 'expenses/detail' }, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesCategoriesRoutingModule { }
