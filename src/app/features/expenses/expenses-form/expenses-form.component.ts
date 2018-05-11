import { Component, OnInit, OnChanges, OnDestroy ,Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Expenses } from './../expenses.model';
import { ExpensesType } from './../../expenses-type/expenses-type.model';
import { ExpensesService } from './../expenses.service';

import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { MasterDataService } from './../../../_services/master-data.service';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss']
})
export class ExpensesFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() expenses : Expenses;
  
    expenseCostId : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
    startDate     : Date = new Date();
    expensesType  : ExpensesType[];
    expenseForm   : FormGroup;
  
  
    constructor(private _fb : FormBuilder,
                private _service : ExpensesService,
                private _master : MasterDataService,
                private _toaster : ToasterService,
                private _errHandler : ErrorHandlerService,
                private _loader : ProgressDialogService
                ) {
                  this.createForm();
                 }
  
    ngOnInit() {
      
      this.initExpenses();
    }
  
  
  
    ngOnChanges() {
      
      this.expenseForm.setValue({
          expenseCostId    : this.expenses.expenseCostId,
          expenseId        : this.expenses.expenseId,
          expenseCost      : this.expenses.expenseCost,
          expenserrNo      : this.expenses.expenserrNo,
          dateExpense      : new Date(this.expenses.dateExpense),
          details          : this.expenses.details
      });
  
      this.expenseCostId.next(this.expenses.expenseCostId);
  
    }
  
    createForm() {
      
      this.expenseForm = this._fb.group({
        expenseCostId   : [0,Validators.required],
        expenseId       : [null, Validators.required],
        expenseCost     : [null, Validators.required],
        expenserrNo     : [null, Validators.required],
        dateExpense     : [new Date(), Validators.required],
        details         : [null,Validators.maxLength(200)]
      });
  
    }
  
    initExpenses(){
      this._service.getExpenses().subscribe((response) => { this.expensesType = response; }, (err) => { this._errHandler.errorHandler(err); });
    }
  
    saveForm() {
      // Get the ID value from the Form
      const id  = this.expenseCostId.value;
      this._loader.openSpinner();
  
      if(id != 0) {
        //Update if the id is not equal to null
        this._service
        .update(this.expenseForm.value)
        .subscribe((res) => {
           if(res.status == 200){
             this.expenses = this.expenseForm.value;
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
        expenseCostId : 0
      });
    }
  
    ngOnDestroy(){
      this.expenseCostId.unsubscribe();
    }

}
