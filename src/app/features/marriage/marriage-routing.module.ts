import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';
import { MarriageComponent } from './marriage.component';
import { MarriageEditorComponent } from './marriage-editor/marriage-editor.component';
import { MarriageCreateComponent } from './marriage-create/marriage-create.component';
import { MarriageBulkComponent } from './marriage-bulk/marriage-bulk.component';
import { MarriagePrintComponent } from './marriage-print/marriage-print.component';

const routes: Routes = [
  { path: '', component: MarriageComponent, data: { animation:'marriage' }, canActivate:[AuthGuardStateService] },
  { path: 'create', component: MarriageCreateComponent, data: { animation:'marriage/create' }, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: MarriageEditorComponent, data: { animation:'marriage/detail' }, canActivate:[AuthGuardStateService] },
  { path: 'bulk', component: MarriageBulkComponent, data: { animation:'marriage/bulk' }, canActivate:[AuthGuardStateService] },
  { path: 'print/:id', component: MarriagePrintComponent, data: { animation:'marriage/print' }, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarriageRoutingModule { }
