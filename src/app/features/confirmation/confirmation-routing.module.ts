import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';
import { ConfirmationComponent } from './confirmation.component';
import { ConfirmationCreateComponent } from './confirmation-create/confirmation-create.component';
import { ConfirmationEditorComponent } from './confirmation-editor/confirmation-editor.component';
import { ConfirmationBulkComponent } from './confirmation-bulk/confirmation-bulk.component';
import { ConfirmationPrintComponent } from './confirmation-print/confirmation-print.component';

const routes: Routes = [
  { path: '', component: ConfirmationComponent, data: {animation:'confirmation'}, canActivate:[AuthGuardStateService] },
  { path: 'create', component: ConfirmationCreateComponent, data: {animation:'confirmation/create'}, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: ConfirmationEditorComponent, data: {animation:'confirmation/detail'}, canActivate:[AuthGuardStateService] },
  { path: 'bulk', component: ConfirmationBulkComponent, data: {animation:'confirmation/bulk'}, canActivate:[AuthGuardStateService] },
  { path: 'print/:id', component: ConfirmationPrintComponent, data: {animation:'confirmation/print'}, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmationRoutingModule { }
