import { Component, OnInit, OnChanges, OnDestroy ,Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Marriage } from './../marriage.model';
import { MarriageService } from './../marriage.service';

import { Minister } from './../../minister/minister.model';

import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { MasterDataService } from './../../../_services/master-data.service';

@Component({
  selector: 'app-marriage-form',
  templateUrl: './marriage-form.component.html',
  styleUrls: ['./marriage-form.component.scss']
})
export class MarriageFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() marriage : Marriage;
  
    marriage_id : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
    startDate   : Date = new Date();
    ministers : Minister[];
    marriageForm : FormGroup;
  
  
    constructor(private _fb : FormBuilder,
                private _service : MarriageService,
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
      
      this.marriageForm.setValue({
        marriage_id         : this.marriage.marriage_id,
        husband_id          : this.marriage.husband_id,
        wife_id             : this.marriage.wife_id,
        date_married        : new Date(this.marriage.date_married),
        sponsors            : this.marriage.sponsors,
        remarks             : this.marriage.remarks,
        book_no             : this.marriage.book_no,
        page_no             : this.marriage.page_no,
        entry_no            : this.marriage.entry_no,
        minister_id         : this.marriage.minister_id,
        husband_name        : this.marriage.husband_name,
        husband_father_name : this.marriage.husband_father_name,
        husband_mother_name : this.marriage.husband_mother_name,
        husband_residence   : this.marriage.husband_residence,
        husband_religion    : this.marriage.husband_religion,
        husband_date_birth  : new Date(this.marriage.husband_date_birth),
        wife_name           : this.marriage.wife_name,
        wife_father_name    : this.marriage.wife_father_name,
        wife_mother_name    : this.marriage.wife_residence,
        wife_residence      : this.marriage.wife_residence,
        wife_religion       : this.marriage.wife_religion,
        wife_date_birth     : new Date(this.marriage.wife_date_birth)
      });
  
      this.marriage_id.next(this.marriage.marriage_id);
  
    }
  
    createForm() {
      
      this.marriageForm = this._fb.group({
        marriage_id         : [0,Validators.required],
        husband_id          : [0,Validators.required],
        wife_id             : [0,Validators.required],
        date_married        : [null,Validators.required],
        sponsors            : [null,[Validators.maxLength(200)]],
        remarks             : [null,[Validators.maxLength(200)]],
        book_no             : [null,[Validators.required,Validators.min(1)]],
        page_no             : [null,[Validators.required,Validators.min(1)]],
        entry_no            : [null,[Validators.required,Validators.min(1)]],
        minister_id         : [null,Validators.required],
        husband_name        : [null,Validators.required],
        husband_father_name : [null,Validators.required],
        husband_mother_name : [null,Validators.required],
        husband_residence   : [null],
        husband_religion    : [null],
        husband_date_birth  : [null, Validators.required],
        wife_name           : [null,Validators.required],
        wife_father_name    : [null,Validators.required],
        wife_mother_name    : [null,Validators.required],
        wife_residence      : [null],
        wife_religion       : [null],
        wife_date_birth     : [null, Validators.required]
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
      const id  = this.marriage_id.value;
      this._loader.openSpinner();
  
      if(id != 0) {
        //Update if the id is not equal to null
        this._service
        .updateData(this.marriageForm.value)
        .subscribe((res) => {
           if(res.status == 200){
             this.marriage = this.marriageForm.value;
             this._toaster.showSuccess();
           }
           this._loader.closeSpinner();
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
        
  
      } else {
  
        //Create or Save New if the id value is null
        this._service
        .saveData(this.marriageForm.value)
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
      this.marriageForm.reset();
  
      this.marriageForm.patchValue({
        marriage_id : 0,
        husband_id  : 0,
        wife_id     : 0
      });
    }
  
    ngOnDestroy(){
      this.marriage_id.unsubscribe();
    }

}
