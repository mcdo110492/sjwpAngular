import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardStateService } from './../../_services/auth-guard-state.service';

import { ServicesCategoriesComponent } from './services-categories.component';
import { ServicesCategoriesCreateComponent } from './services-categories-create/services-categories-create.component';
import { ServicesCategoriesEditorComponent } from './services-categories-editor/services-categories-editor.component';

const routes: Routes = [
  { path: '', component: ServicesCategoriesComponent, data:{ animation : 'services/categories' }, canActivate:[AuthGuardStateService] },
  { path: 'create', component: ServicesCategoriesCreateComponent, data:{ animation : 'services/categories/create' }, canActivate:[AuthGuardStateService] },
  { path: 'detail/:id', component: ServicesCategoriesEditorComponent, data:{ animation : 'services/categories/detail' }, canActivate:[AuthGuardStateService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesCategoriesRoutingModule { }
