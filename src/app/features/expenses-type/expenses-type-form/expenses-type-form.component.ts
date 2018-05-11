import { Component, OnInit, OnChanges, OnDestroy ,Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ExpensesCategories } from './../../expenses-categories/expenses-categories.model';
import { ExpensesType } from './../expenses-type.model';
import { ExpensesTypeService } from './../expenses-type.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { MasterDataService } from './../../../_services/master-data.service';

@Component({
  selector: 'app-expenses-type-form',
  templateUrl: './expenses-type-form.component.html'
})
export class ExpensesTypeFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() expenseType : ExpensesType;
  
    expenseId   : BehaviorSubject<number> = new BehaviorSubject<number>(0);
    expenseForm : FormGroup;
    categories  : ExpensesCategories[] = [];
  
  
    constructor(private _fb : FormBuilder,
                private _service : ExpensesTypeService,
                private _master : MasterDataService,
                private _toaster : ToasterService,
                private _errHandler : ErrorHandlerService,
                private _loader : ProgressDialogService
                ) {
                  this.createForm();
                 }
  
    ngOnInit() {
        this.initCategories();
    }


    initCategories(){
      this._service.getCategories().subscribe((result) => {
        this.categories = result;
      });
    }
  
  
  
    ngOnChanges() {
      
      this.expenseForm.setValue({
        expenseId               : this.expenseType.expenseId,
        expenseCode             : this.expenseType.expenseCode,
        expenseName             : this.expenseType.expenseName,
        expenseCategoryId       : this.expenseType.expenseCategoryId
      });
  
      this.expenseId.next(this.expenseType.expenseId);
  
    }
  
    createForm() {
      
      this.expenseForm = this._fb.group({
        expenseId         : [0,Validators.required],
        expenseCode       : [null, Validators.required],
        expenseName       : [null,Validators.required],
        expenseCategoryId : [null]
      });
  
    }
  

  
    saveForm() {
      // Get the ID value from the Form
      const id  = this.expenseId.value;
      this._loader.openSpinner();
  
      if(id != 0) {
        //Update if the id is not equal to null
        this._service
        .update(this.expenseForm.value)
        .subscribe((res) => {
           if(res.status == 200){
             this.expenseType = this.expenseForm.value;
             this._toaster.showSuccess();
           }
           this._loader.closeSpinner();
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
        
  
      } else {
  
        //Create or Save New if the id value is null
        this._service
        .save(this.expenseForm.value)
        .subscribe((res) => {
          if(res.status == 200){
            this.resetForm();
            this._toaster.showSuccess();
          }
  
          this._loader.closeSpinner();
        },
        (err) => {
          this._errHandler.errorHandler(err); this._loader.closeSpinner();
        });
      
      }
      
    }
  
    revertForm() {
      this.ngOnChanges();
    }
  
    resetForm(){
      this.expenseForm.reset();
  
      this.expenseForm.patchValue({
        expenseId : 0
      });
    }
  
    ngOnDestroy(){
      this.expenseId.unsubscribe();
    }

}
