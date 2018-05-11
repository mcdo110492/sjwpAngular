import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { PosComponent } from './pos.component';

const routes: Routes = [
  { path: '', component: PosComponent, data: {animation:'pos'}, canActivate:[AuthGuardStateService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
