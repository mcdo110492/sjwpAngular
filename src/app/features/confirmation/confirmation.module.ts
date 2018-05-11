import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { FileUploadModule } from './../file-upload/file-upload.module';
import { TitleBarModule } from './../title-bar/title-bar.module';

import { ConfirmationRoutingModule } from './confirmation-routing.module';

import { ConfirmationComponent } from './confirmation.component';

import { ConfirmationService } from './confirmation.service';
import { ConfirmationFormComponent } from './confirmation-form/confirmation-form.component';
import { ConfirmationEditorComponent } from './confirmation-editor/confirmation-editor.component';
import { ConfirmationCreateComponent } from './confirmation-create/confirmation-create.component';
import { ConfirmationBulkComponent } from './confirmation-bulk/confirmation-bulk.component';
import { ConfirmationPrintComponent } from './confirmation-print/confirmation-print.component';

@NgModule({
  imports: [
    ConfirmationRoutingModule,
    SharedModule,
    FileUploadModule,
    TitleBarModule
  ],
  declarations: [ConfirmationComponent, ConfirmationFormComponent, ConfirmationEditorComponent, ConfirmationCreateComponent, ConfirmationBulkComponent, ConfirmationPrintComponent],
  providers:[ConfirmationService]
})
export class ConfirmationModule { }
