import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { TitleBarModule } from './../title-bar/title-bar.module';


import { PosRoutingModule } from './pos-routing.module';

import { PosComponent } from './pos.component';

import { PosService } from './pos.service';
import { PosSearchComponent } from './pos-search/pos-search.component';
import { PosFormComponent } from './pos-form/pos-form.component';

@NgModule({
  imports: [
    SharedModule,
    PosRoutingModule,
    TitleBarModule
  ],
  declarations: [PosComponent, PosSearchComponent, PosFormComponent],
  providers:[PosService]
})
export class PosModule { }
