import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { FileUploadModule } from './../file-upload/file-upload.module';
import { TitleBarModule } from './../title-bar/title-bar.module';

import { MarriageRoutingModule } from './marriage-routing.module';

import { MarriageComponent } from './marriage.component';

import { MarriageService } from './marriage.service';
import { MarriageFormComponent } from './marriage-form/marriage-form.component';
import { MarriageEditorComponent } from './marriage-editor/marriage-editor.component';
import { MarriageCreateComponent } from './marriage-create/marriage-create.component';
import { MarriageBulkComponent } from './marriage-bulk/marriage-bulk.component';
import { MarriagePrintComponent } from './marriage-print/marriage-print.component';

@NgModule({
  imports: [
    SharedModule,
    MarriageRoutingModule,
    FileUploadModule,
    TitleBarModule
  ],
  declarations: [
    MarriageComponent,
    MarriageFormComponent,
    MarriageEditorComponent,
    MarriageCreateComponent,
    MarriageBulkComponent,
    MarriagePrintComponent
  ],
  providers: [
    MarriageService
  ]
})
export class MarriageModule { }
