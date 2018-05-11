import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { TitleBarModule } from './../title-bar/title-bar.module';

import { ServicesTypeRoutingModule } from './services-type-routing.module';

import { ServicesTypeComponent } from './services-type.component';
import { ServicesTypeFormComponent } from './services-type-form/services-type-form.component';
import { ServicesTypeCreateComponent } from './services-type-create/services-type-create.component';
import { ServicesTypeEditorComponent } from './services-type-editor/services-type-editor.component';

import { ServicesTypeService } from './services-type.service';

@NgModule({
  imports: [
    SharedModule,
    TitleBarModule,
    ServicesTypeRoutingModule
  ],
  declarations: [ServicesTypeComponent,ServicesTypeFormComponent, ServicesTypeCreateComponent, ServicesTypeEditorComponent],
  providers:[ServicesTypeService]
})
export class ServicesTypeModule { }
