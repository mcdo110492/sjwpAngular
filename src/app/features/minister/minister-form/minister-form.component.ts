import { Component, OnInit, OnChanges, OnDestroy ,Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Minister } from './../minister.model';
import { MinisterService } from './../minister.service';



import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-minister-form',
  templateUrl: './minister-form.component.html',
  styleUrls: ['./minister-form.component.scss']
})
export class MinisterFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() minister : Minister;
  
    minister_id : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
    ministerForm : FormGroup;
  
  
    constructor(private _fb : FormBuilder,
                private _service : MinisterService,
                private _toaster : ToasterService,
                private _errHandler : ErrorHandlerService,
                private _loader : ProgressDialogService
                ) {
                  this.createForm();
                 }

  
    ngOnInit() {

    }
  
  
  
    ngOnChanges() {
      
      this.ministerForm.setValue({
          minister_id     : this.minister.minister_id,
          minister_name   : this.minister.minister_name 
      });
  
      this.minister_id.next(this.minister.minister_id);
  
    }
  
    createForm() {
      
      this.ministerForm = this._fb.group({
        minister_id      : [0,Validators.required],
        minister_name    : [null, Validators.required]
      });
  
    }
  

  
    saveForm() {
      // Get the ID value from the Form
      const id  = this.minister_id.value;
      this._loader.openSpinner();
  
      if(id != 0) {
        //Update if the id is not equal to null
        this._service
        .updateData(this.ministerForm.value)
        .subscribe((res) => {
           if(res.status == 200){
             this.minister = this.ministerForm.value;
             this._toaster.showSuccess();
           }
           this._loader.closeSpinner();
        },
        (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
        
  
      } else {
  
        //Create or Save New if the id value is null
        this._service
        .saveData(this.ministerForm.value)
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
      this.ministerForm.reset();
  
      this.ministerForm.patchValue({
        minister_id : 0
      });
      console.log(this.ministerForm.value);
    }
  
    ngOnDestroy(){
      this.minister_id.unsubscribe();
    }

}
