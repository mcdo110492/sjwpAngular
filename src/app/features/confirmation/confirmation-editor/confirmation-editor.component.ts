import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';


import { Confirmation } from './../confirmation.model';
import { ConfirmationService } from './../confirmation.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-confirmation-editor',
  templateUrl: './confirmation-editor.component.html',
  styleUrls: ['./confirmation-editor.component.scss']
})
export class ConfirmationEditorComponent implements OnInit {

  confirmation  : Confirmation;
  
    constructor(private _route: ActivatedRoute, 
                private _service : ConfirmationService,
                private _loader : ProgressDialogService,
                private _errHandle : ErrorHandlerService ) { }
  
    ngOnInit() {
      this._loader.openSpinner();
      this.initDetails();
    }
  
    
  
  
    initDetails() {
      this._route.paramMap
                 .switchMap((params : ParamMap) => this._service.getData(+params.get('id')))
                 .subscribe((data) => { 
                   this.confirmation = data;  
  
                   setTimeout(() => { this._loader.closeSpinner(); },0);
                  },
                  (err) => { this._errHandle.errorHandler(err); this._loader.closeSpinner(); });
  
    }


}
