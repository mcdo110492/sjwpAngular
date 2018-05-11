import { Component, OnInit, OnChanges, OnDestroy ,Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Baptism } from './../baptism.model';
import { BaptismService } from './../baptism.service';

import { Minister } from './../../minister/minister.model';

import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { MasterDataService } from './../../../_services/master-data.service';

@Component({
  selector: 'app-baptism-form',
  templateUrl: './baptism-form.component.html',
  styleUrls: ['./baptism-form.component.scss']
})
export class BaptismFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() baptism : Baptism;

  baptism_id : BehaviorSubject<number> = new BehaviorSubject<number>(0);

  startDate   : Date = new Date();
  ministers : Minister[];
  baptismForm : FormGroup;


  constructor(private _fb : FormBuilder,
              private _service : BaptismService,
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
    
    this.baptismForm.setValue({
        baptism_id: this.baptism.baptism_id,
        child_name: this.baptism.child_name,
        father_name: this.baptism.father_name,
        mother_name: this.baptism.mother_name,
        birth_place : this.baptism.birth_place,
        birthday: new Date(this.baptism.birthday),
        baptism_date : new Date(this.baptism.baptism_date),
        book_no : this.baptism.book_no,
        page_no : this.baptism.page_no,
        entry_no : this.baptism.entry_no,
        sponsors : this.baptism.sponsors,
        remarks: this.baptism.remarks,
        minister_id : this.baptism.minister_id
    });

    this.baptism_id.next(this.baptism.baptism_id);

  }

  createForm() {
    
    this.baptismForm = this._fb.group({
      baptism_id      : [0,Validators.required],
      child_name      : [null, Validators.required],
      father_name     : [null, Validators.required],
      mother_name     : [null, Validators.required],
      birth_place     : [null],
      birthday        : [null],
      baptism_date    : [null,Validators.required],
      book_no         : [null,[Validators.required,Validators.min(1)]],
      page_no         : [null,[Validators.required,Validators.min(1)]],
      entry_no        : [null,[Validators.required,Validators.min(1)]],
      sponsors        : [null,[Validators.maxLength(200)]],
      remarks         : [null,[Validators.maxLength(200)]],
      minister_id     : [null,Validators.required]
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
    const id  = this.baptism_id.value;
    this._loader.openSpinner();

    if(id != 0) {
      //Update if the id is not equal to null
      this._service
      .updateData(this.baptismForm.value)
      .subscribe((res) => {
         if(res.status == 200){
           this.baptism = this.baptismForm.value;
           this._toaster.showSuccess();
         }
         this._loader.closeSpinner();
      },
      (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
      

    } else {

      //Create or Save New if the id value is null
      this._service
      .saveData(this.baptismForm.value)
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
    this.baptismForm.reset();

    this.baptismForm.patchValue({
      baptism_id : 0
    });
  }

  ngOnDestroy(){
    this.baptism_id.unsubscribe();
  }

}
