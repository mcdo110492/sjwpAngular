import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { DeathComponent } from './death.component';
import { DeathCreateComponent } from './death-create/death-create.component';
import { DeathEditorComponent } from './death-editor/death-editor.component';
import { DeathBulkComponent } from './death-bulk/death-bulk.component';
import { DeathPrintComponent } from './death-print/death-print.component';

const routes: Routes = [
  { path: '', component: DeathComponent , data: {animation:'death'}, canActivate:[AuthGuardStateService] },
  { path: 'create', component: DeathCreateComponent , data: {animation:'create'}, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: DeathEditorComponent , data: {animation:'death/detail'}, canActivate:[AuthGuardStateService] },
  { path: 'bulk', component: DeathBulkComponent , data: {animation:'death/bulk'}, canActivate:[AuthGuardStateService] },
  { path: 'print/:id', component: DeathPrintComponent , data: {animation:'death/print'}, canActivate:[AuthGuardStateService] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeathRoutingModule { }
