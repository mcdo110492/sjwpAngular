import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Confirmation } from './../confirmation.model';
import { ConfirmationService } from './../confirmation.service';

import { Minister } from './../../minister/minister.model';

import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { MasterDataService } from './../../../_services/master-data.service';

@Component({
  selector: 'app-confirmation-form',
  templateUrl: './confirmation-form.component.html',
  styleUrls: ['./confirmation-form.component.scss']
})
export class ConfirmationFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() confirmation : Confirmation;
  
  confirmation_id : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  startDate   : Date = new Date();
  ministers : Minister[];
  confirmationForm : FormGroup;

  constructor(private _fb : FormBuilder,
    private _service : ConfirmationService,
    private _master : MasterDataService,
    private _toaster : ToasterService,
    private _errHandler : ErrorHandlerService,
    private _loader : ProgressDialogService
    ) {
      this.createForm();
     }

    ngOnInit() {
      
      this.initMasterData();
    }
  
  
  
    ngOnChanges() {
      
      this.confirmationForm.setValue({
          confirmation_id   : this.confirmation.confirmation_id,
          child_name        : this.confirmation.child_name,
          father_name       : this.confirmation.father_name,
          mother_name       : this.confirmation.mother_name,
          baptized_at       : this.confirmation.baptized_at,
          confirmation_date : new Date(this.confirmation.confirmation_date),
          baptism_date      : new Date(this.confirmation.baptism_date),
          book_no           : this.confirmation.book_no,
          page_no           : this.confirmation.page_no,
          sponsors          : this.confirmation.sponsors,
          remarks           : this.confirmation.remarks,
          minister_id       : this.confirmation.minister_id
      });
  
      this.confirmation_id.next(this.confirmation.confirmation_id);
  
    }

    createForm() {
      
      this.confirmationForm = this._fb.group({
        confirmation_id   : [0,Validators.required],
        child_name        : [null, Validators.required],
        father_name       : [null, Validators.required],
        mother_name       : [null, Validators.required],
        baptized_at       : [null],
        confirmation_date : [null, Validators.required],
        baptism_date      : [null,Validators.required],
        book_no           : [null,[Validators.required,Validators.min(1)]],
        page_no           : [null,[Validators.required,Validators.min(1)]],
        sponsors          : [null,[Validators.maxLength(200)]],
        remarks           : [null,[Validators.maxLength(200)]],
        minister_id       : [null,Validators.required]
      });
  
    }
  
    initMasterData(){
      this._master
      .getMinisters()
      .subscribe( (res) => {
        this.ministers = res.data
      },
     (err) => { this._errHandler.errorHandler(err); });
    }
  
    saveForm() {
      // Get the ID value from the Form
      const id  = this.confirmation_id.value;
      this._loader.openSpinner();
  
      if(id != 0) {
        //Update if the id is not equal to null
        this._service
        .updateData(this.confirmationForm.value)
        .subscribe((res) => {
           if(res.status == 200){
             this.confirmation = this.confirmationForm.value;
             this._toaster.showSuccess();
           }
           this._loader.closeSpinner();
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
        
  
      } else {
  
        //Create or Save New if the id value is null
        this._service
        .saveData(this.confirmationForm.value)
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
      this.confirmationForm.reset();
  
      this.confirmationForm.patchValue({
        confirmation_id : 0
      });
      console.log(this.confirmationForm.value);
    }
  
    ngOnDestroy(){
      this.confirmation_id.unsubscribe();
    }



}
