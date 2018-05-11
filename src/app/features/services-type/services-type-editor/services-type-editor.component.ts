import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ServicesType } from './../services-type.model';
import { ServicesTypeService } from './../services-type.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-services-type-editor',
  templateUrl: './services-type-editor.component.html'
})
export class ServicesTypeEditorComponent implements OnInit {

  @Input() servicesType : ServicesType;

  
    constructor(private _route: ActivatedRoute, 
                private _service : ServicesTypeService,
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
                   this.servicesType = data;  
  
                   setTimeout(() => { this._loader.closeSpinner(); },0);
                  },
                  (err) => { this._errHandle.errorHandler(err); this._loader.closeSpinner(); });
  
    }

}
