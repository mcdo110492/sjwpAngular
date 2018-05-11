import { Component, OnInit, OnChanges, OnDestroy ,Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Death } from './../death.model';
import { DeathService } from './../death.service';

import { Minister } from './../../minister/minister.model';

import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';
import { MasterDataService } from './../../../_services/master-data.service';

@Component({
  selector: 'app-death-form',
  templateUrl: './death-form.component.html',
  styleUrls: ['./death-form.component.scss']
})
export class DeathFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() death : Death;
  
    death_id : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
    startDate   : Date = new Date();
    ministers : Minister[];
    deathForm : FormGroup;
  
  
    constructor(private _fb : FormBuilder,
                private _service : DeathService,
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
      
      this.deathForm.setValue({
          death_id          : this.death.death_id,
          deceased_name     : this.death.deceased_name,
          residence         : this.death.residence,
          date_death        : new Date(this.death.date_death),
          place_burial      : this.death.place_burial,
          date_burial       : new Date(this.death.date_burial),
          book_no           : this.death.book_no,
          page_no           : this.death.page_no,
          entry_no          : this.death.entry_no,
          minister_id       : this.death.minister_id
      });
  
      this.death_id.next(this.death.death_id);
  
    }
  
    createForm() {
      
      this.deathForm = this._fb.group({
        death_id        : [0,Validators.required],
        deceased_name   : [null, Validators.required],
        residence       : [null, Validators.required],
        date_death      : [null, Validators.required],
        place_burial    : [null, Validators.required],
        date_burial     : [null, Validators.required],
        book_no         : [null,[Validators.required,Validators.min(1)]],
        page_no         : [null,[Validators.required,Validators.min(1)]],
        entry_no        : [null,[Validators.required,Validators.min(1)]],
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
      const id  = this.death_id.value;
      this._loader.openSpinner();
  
      if(id != 0) {
        //Update if the id is not equal to null
        this._service
        .updateData(this.deathForm.value)
        .subscribe((res) => {
           if(res.status == 200){
             this.death = this.deathForm.value;
             this._toaster.showSuccess();
           }
           this._loader.closeSpinner();
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
        
  
      } else {
  
        //Create or Save New if the id value is null
        this._service
        .saveData(this.deathForm.value)
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
      this.deathForm.reset();
  
      this.deathForm.patchValue({
        death_id : 0
      });
      console.log(this.deathForm.value);
    }
  
    ngOnDestroy(){
      this.death_id.unsubscribe();
    }
  

}
