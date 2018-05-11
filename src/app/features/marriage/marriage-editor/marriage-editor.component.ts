import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';


import { Marriage } from './../marriage.model';
import { MarriageService } from './../marriage.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-marriage-editor',
  templateUrl: './marriage-editor.component.html',
  styleUrls: ['./marriage-editor.component.scss']
})
export class MarriageEditorComponent implements OnInit {

  marriage  : Marriage;
  
    constructor(private _route: ActivatedRoute, 
                private _service : MarriageService,
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
                   this.marriage = data;  
  
                   setTimeout(() => { this._loader.closeSpinner(); },0);
                  },
                  (err) => { this._errHandle.errorHandler(err); this._loader.closeSpinner(); });

    }
}
