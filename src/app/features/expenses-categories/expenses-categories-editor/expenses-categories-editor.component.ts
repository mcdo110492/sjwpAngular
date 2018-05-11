import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';


import { ExpensesCategories } from './../expenses-categories.model';
import { ExpensesCategoriesService } from './../expenses-categories.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-expenses-categories-editor',
  templateUrl: './expenses-categories-editor.component.html'
})
export class ExpensesCategoriesEditorComponent implements OnInit {

  category  : ExpensesCategories;
  
    constructor(private _route: ActivatedRoute, 
                private _service : ExpensesCategoriesService,
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
                   this.category = data;  
  
                   setTimeout(() => { this._loader.closeSpinner(); },0);
                  },
                  (err) => { this._errHandle.errorHandler(err); this._loader.closeSpinner(); });
  
    }

}
