import { Component, OnInit, OnChanges, OnDestroy ,Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ServicesType } from './../services-type.model';
import { ServicesCategories } from './../../services-categories/services-categories.model';
import { ServicesTypeService } from './../services-type.service';


import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { MasterDataService } from './../../../_services/master-data.service';

@Component({
  selector: 'app-services-type-form',
  templateUrl: './services-type-form.component.html'
})
export class ServicesTypeFormComponent implements OnInit, OnChanges, OnDestroy {

    @Input() servicesType : ServicesType;

  
    serviceId : BehaviorSubject<number> = new BehaviorSubject<number>(0);
    serviceForm : FormGroup;
    categories  : ServicesCategories[];

  
    constructor(private _fb : FormBuilder,
                private _service : ServicesTypeService,
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
  
  
  
    ngOnChanges() {
      
      this.serviceForm.setValue({
          serviceId             : this.servicesType.serviceId,
          serviceCode           : this.servicesType.serviceCode,
          serviceName           : this.servicesType.serviceName,
          cost                  : this.servicesType.cost,
          serviceCategoryId     : this.servicesType.serviceCategoryId
      });
  
      this.serviceId.next(this.servicesType.serviceId);
  
    }
  
    createForm() {
      
      this.serviceForm = this._fb.group({
        serviceId         : [0,Validators.required],
        serviceCode       : [null, Validators.required],
        serviceName       : [null,Validators.required],
        cost              : [null,[Validators.required,Validators.min(1)]],
        serviceCategoryId : [null]
      });
  
    }

    initCategories(){
      this._service.getCategories().subscribe((result) => {
        this.categories = result;
      });
    }
  

  
    saveForm() {
      // Get the ID value from the Form
      const id  = this.serviceId.value;
      this._loader.openSpinner();
  
      if(id != 0) {
        //Update if the id is not equal to null
        this._service
        .update(this.serviceForm.value)
        .subscribe((res) => {
           if(res.status == 200){
             this.servicesType = this.serviceForm.value;
             this._toaster.showSuccess();
           }
           this._loader.closeSpinner();
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
        
  
      } else {
  
        //Create or Save New if the id value is null
        this._service
        .save(this.serviceForm.value)
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
      this.serviceForm.reset();
  
      this.serviceForm.patchValue({
        serviceId : 0
      });
    }
  
    ngOnDestroy(){
      this.serviceId.unsubscribe();
    }

}
