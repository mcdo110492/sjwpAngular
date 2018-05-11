import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { TitleBarModule } from './../title-bar/title-bar.module';

import { ServicesCategoriesRoutingModule } from './services-categories-routing.module';

import { ServicesCategoriesComponent } from './services-categories.component';
import { ServicesCategoriesService } from './services-categories.service';
import { ServicesCategoriesFormComponent } from './services-categories-form/services-categories-form.component';
import { ServicesCategoriesCreateComponent } from './services-categories-create/services-categories-create.component';
import { ServicesCategoriesEditorComponent } from './services-categories-editor/services-categories-editor.component';

@NgModule({
  imports: [
    SharedModule,
    TitleBarModule,
    ServicesCategoriesRoutingModule
  ],
  declarations: [ServicesCategoriesComponent, ServicesCategoriesFormComponent, ServicesCategoriesCreateComponent, ServicesCategoriesEditorComponent],
  providers:[ServicesCategoriesService]
})
export class ServicesCategoriesModule { }
