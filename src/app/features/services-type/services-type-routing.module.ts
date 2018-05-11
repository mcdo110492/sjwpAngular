import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { ServicesTypeComponent } from './services-type.component';
import { ServicesTypeCreateComponent } from './services-type-create/services-type-create.component';
import { ServicesTypeEditorComponent } from './services-type-editor/services-type-editor.component';

const routes: Routes = [
  { path: '', component: ServicesTypeComponent, data:{ animation:'services/type' }, canActivate:[AuthGuardStateService] },
  { path: 'create', component: ServicesTypeCreateComponent, data:{ animation:'services/type/create' }, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: ServicesTypeEditorComponent, data:{ animation:'services/type/detail' }, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesTypeRoutingModule { }
