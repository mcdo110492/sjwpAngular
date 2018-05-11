import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';

import { FileUploadComponent } from './file-upload.component';
import { FileUploadService } from './file-upload.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [FileUploadComponent],
  providers:[FileUploadService],
  exports:[FileUploadComponent]
})
export class FileUploadModule { }
