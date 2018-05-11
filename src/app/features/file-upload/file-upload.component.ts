import { Component, OnInit, Input } from '@angular/core';

import { HttpEventType, HttpResponse } from '@angular/common/http';



import { FileUploadService } from './file-upload.service';

import { Minister } from './../minister/minister.model';

import { MasterDataService } from './../../_services/master-data.service';
import { ErrorHandlerService } from './../../_services/error-handler.service';
import { ToasterService } from './../../_services/toaster.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Input() source : string;

  constructor(private _service : FileUploadService,
              private _master : MasterDataService,
              private _errHandler : ErrorHandlerService,
              private _toaster : ToasterService){}

  //File Property
  myFile : File;
  fileName : string = '';
  percentDone : number = 0;
  
  //Minister Property
  ministers : Minister[];
  selectedMinister : number;

  //Form Property Status
  FORM_VALID : boolean = false;
  UPLOAD_STATUS : boolean = false;
    

  ngOnInit() {
    this.initMasterData(); // Initialize th minister lists
  }



  //Capture the input file change event
  fileChangeEvent(files : File){

   this.myFile = files[0];
   this.fileName = this.myFile.name;
   
   let fileExt = this.myFile.name.split('.'); // file type
   let fileSize = this.myFile.size; // file size in bytes

    //Check if the file extension and the size meet the set requirements then set the UPLOAD_STATUS to true otherwise false
    if(fileExt[1] === 'xlsx' && fileSize <= 5000000){
      this.UPLOAD_STATUS = true;
    }
    else {
      this._toaster.showCustom('warning','This File is not allowed','Acceptable file extension is "xlsx" and file size must not exceed 5mb');
      this.UPLOAD_STATUS = false;
    }
    
  }

  ministerChangeEvent(){
    this.FORM_VALID = true;
  }




  initMasterData(){
    this._master
    .getMinisters()
    .subscribe( (res) => {
      this.ministers = res.data
    },
   (err) => { this._errHandler.errorHandler(err); });
  }

  fileSubmit(){
    let source = this.source;
    this._service.uploadFile(this.myFile,this.selectedMinister,source).subscribe((event) => {
        
        if(event.type === HttpEventType.UploadProgress){

           this.percentDone = Math.round(100 * event.loaded / event.total);
         

        }
        else if(event instanceof HttpResponse ) {

          this.UPLOAD_STATUS = false;
          this.fileName = '';
          this.percentDone = 0;
          this._toaster.showCustom('success','File Upload Success',"You' re file has been successfully upload.");

        }

    },
    (err) => { this._errHandler.errorHandler(err); });
  }

}
