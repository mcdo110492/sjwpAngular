import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';


import { ExpensesType } from './../expenses-type.model';
import { ExpensesTypeService } from './../expenses-type.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-expenses-type-editor',
  templateUrl: './expenses-type-editor.component.html'
})
export class ExpensesTypeEditorComponent implements OnInit {

  expenseType  : ExpensesType;
  
    constructor(private _route: ActivatedRoute, 
                private _service : ExpensesTypeService,
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
                   this.expenseType = data;  
  
                   setTimeout(() => { this._loader.closeSpinner(); },0);
                  },
                  (err) => { this._errHandle.errorHandler(err); this._loader.closeSpinner(); });
  
    }


}
