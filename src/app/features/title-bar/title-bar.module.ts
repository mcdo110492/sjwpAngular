import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './../../shared/shared.module';

import { TitleBarComponent } from './title-bar.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [TitleBarComponent],
  exports:[TitleBarComponent]
})
export class TitleBarModule { }
