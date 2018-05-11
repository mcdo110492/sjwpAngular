import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';


import { Expenses } from './../expenses.model';
import { ExpensesService } from './../expenses.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-expenses-editor',
  templateUrl: './expenses-editor.component.html'
})
export class ExpensesEditorComponent implements OnInit {

  expenses  : Expenses;
  
    constructor(private _route: ActivatedRoute, 
                private _service : ExpensesService,
                private _loader : ProgressDialogService,
                private _errHandle : ErrorHandlerService ) { }
  
    ngOnInit() {
      this._loader.openSpinner();
      this.initDetails();
    }
  
    
  
  
    initDetails() {
      this._route.paramMap
                 .switchMap((params : ParamMap) => this._service.getDetails(+params.get('id')))
                 .subscribe((data) => { 
                   this.expenses = data;  
  
                   setTimeout(() => { this._loader.closeSpinner(); },0);
                  },
                  (err) => { this._errHandle.errorHandler(err); this._loader.closeSpinner(); });
  
    }

}
