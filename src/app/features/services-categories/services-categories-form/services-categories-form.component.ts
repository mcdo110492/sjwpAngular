import { Component, OnInit, OnChanges, OnDestroy ,Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ServicesCategories } from './../services-categories.model';
import { ServicesCategoriesService } from './../services-categories.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { MasterDataService } from './../../../_services/master-data.service';

@Component({
  selector: 'app-services-categories-form',
  templateUrl: './services-categories-form.component.html'
})
export class ServicesCategoriesFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() category : ServicesCategories;
  
    serviceCategoryId : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
    categoryForm : FormGroup;
  
  
    constructor(private _fb : FormBuilder,
                private _service : ServicesCategoriesService,
                private _master : MasterDataService,
                private _toaster : ToasterService,
                private _errHandler : ErrorHandlerService,
                private _loader : ProgressDialogService
                ) {
                  this.createForm();
                 }
  
    ngOnInit() {
      
    }
  
  
  
    ngOnChanges() {
      
      this.categoryForm.setValue({
          serviceCategoryId: this.category.serviceCategoryId,
          serviceCategoryName: this.category.serviceCategoryName
      });
  
      this.serviceCategoryId.next(this.category.serviceCategoryId);
  
    }
  
    createForm() {
      
      this.categoryForm = this._fb.group({
        serviceCategoryId      : [0,Validators.required],
        serviceCategoryName    : [null, Validators.required]
      });
  
    }
  

  
    saveForm() {
      // Get the ID value from the Form
      const id  = this.serviceCategoryId.value;
      this._loader.openSpinner();
  
      if(id != 0) {
        //Update if the id is not equal to null
        this._service
        .update(this.categoryForm.value)
        .subscribe((res) => {
           if(res.status == 200){
             this.category = this.categoryForm.value;
             this._toaster.showSuccess();
           }
           this._loader.closeSpinner();
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
        
  
      } else {
  
        //Create or Save New if the id value is null
        this._service
        .save(this.categoryForm.value)
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
      this.categoryForm.reset();
  
      this.categoryForm.patchValue({
        serviceCategoryId : 0
      });
    }
  
    ngOnDestroy(){
      this.serviceCategoryId.unsubscribe();
    }

}
