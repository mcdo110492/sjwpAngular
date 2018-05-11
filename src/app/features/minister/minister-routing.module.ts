import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { MinisterComponent } from './minister.component';
import { MinisterCreateComponent } from './minister-create/minister-create.component';
import { MinisterEditorComponent } from './minister-editor/minister-editor.component';

const routes: Routes = [
  { path: '', component: MinisterComponent, data: {animation:'minister'}, canActivate:[AuthGuardStateService] },
  { path: 'create', component: MinisterCreateComponent, data: {animation:'minister/create'}, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: MinisterEditorComponent, data: {animation:'minister/details'}, canActivate:[AuthGuardStateService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinisterRoutingModule { }
