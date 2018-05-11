import { Component, OnInit, OnDestroy} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserProfileUsername } from './../user-profile.model';
import { UserProfileService } from './../user-profile.service';



import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  userProfileForm : FormGroup;

  constructor(private _service    : UserProfileService,
              private _loader     : ProgressDialogService,
              private _toaster    : ToasterService,
              private _errHandler : ErrorHandlerService,
              private _fb         : FormBuilder) { 

                this.createForm();
              }


  ngOnInit() {
  }

  createForm(){
    this.userProfileForm = this._fb.group({
      username   : [null,Validators.required]
    }); 
  }

  changeUsername(){

      this._service
          .changeUsername(this.userProfileForm.value)
          .subscribe( (response) => {
            if(response.status == 200){
              this._toaster.showCustom('success','Username Change','Username has been changed successfully');
              this.userProfileForm.reset();
            }

          }, (err) => { this._errHandler.errorHandler(err) });

  }

}
