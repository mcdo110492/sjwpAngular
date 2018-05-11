import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';
import { BaptismComponent } from './baptism.component';
import { BaptismCreateComponent } from './baptism-create/baptism-create.component';
import { BaptismEditorComponent } from './baptism-editor/baptism-editor.component';
import { BaptismBulkComponent } from './baptism-bulk/baptism-bulk.component';
import { BaptismPrintComponent } from './baptism-print/baptism-print.component';

const routes: Routes = [
  { path: '', component: BaptismComponent, data: {animation:'baptism'}, canActivate:[AuthGuardStateService] },
  { path: 'create', component: BaptismCreateComponent, data: {animation:'baptism/create'}, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: BaptismEditorComponent, data: {animation:'baptism/detail'}, canActivate:[AuthGuardStateService] },
  { path: 'bulk', component: BaptismBulkComponent, data: {animation:'baptism/bulk'}, canActivate:[AuthGuardStateService] },
  { path: 'print/:id', component: BaptismPrintComponent, data: {animation:'baptism/print'}, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaptismRoutingModule { }
