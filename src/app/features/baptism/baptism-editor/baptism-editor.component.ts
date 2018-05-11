import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';


import { Baptism } from './../baptism.model';
import { BaptismService } from './../baptism.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';


@Component({
  selector: 'app-baptism-editor',
  templateUrl: './baptism-editor.component.html',
  styleUrls: ['./baptism-editor.component.scss']
})
export class BaptismEditorComponent implements OnInit {


  baptism  : Baptism;

  constructor(private _route: ActivatedRoute, 
              private _service : BaptismService,
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
                 this.baptism = data;  

                 setTimeout(() => { this._loader.closeSpinner(); },0);
                },
                (err) => { this._errHandle.errorHandler(err); this._loader.closeSpinner(); });

  }

  

  

 

}
