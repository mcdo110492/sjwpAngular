import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';


import { Death } from './../death.model';
import { DeathService } from './../death.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-death-editor',
  templateUrl: './death-editor.component.html',
  styleUrls: ['./death-editor.component.scss']
})
export class DeathEditorComponent implements OnInit {

  death  : Death;
  
    constructor(private _route: ActivatedRoute, 
                private _service : DeathService,
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
                   this.death = data;  
  
                   setTimeout(() => { this._loader.closeSpinner(); },0);
                  },
                  (err) => { this._errHandle.errorHandler(err); this._loader.closeSpinner(); });
    }

}
