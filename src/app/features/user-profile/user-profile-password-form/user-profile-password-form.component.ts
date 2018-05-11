import { Component, OnInit, OnDestroy} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserProfilePassword } from './../user-profile.model';
import { UserProfileService } from './../user-profile.service';

import { PasswordValidation } from './password-match-validation';

import { ProgressDialogService } from './../../../_services/progress-dialog.service';
import { ToasterService } from './../../../_services/toaster.service';
import { ErrorHandlerService } from './../../../_services/error-handler.service';

@Component({
  selector: 'app-user-profile-password-form',
  templateUrl: './user-profile-password-form.component.html',
  styleUrls: ['./user-profile-password-form.component.scss']
})
export class UserProfilePasswordFormComponent implements OnInit {

  userProfilePasswordForm : FormGroup;
  
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
      this.userProfilePasswordForm = this._fb.group({
        password            : [null,Validators.required],
        newPassword         : [null,Validators.required],
        confirmPassword     : [null,Validators.required]
      }, {
        validator: PasswordValidation.MatchPassword // your validation method
      }); 
      
    }
  
    changePassword(){ 
  
        this._service
            .changePassword(this.userProfilePasswordForm.value)
            .subscribe( (response) => {
              if(response.status == 200){
                this._toaster.showCustom('success','Password Change','Password has been changed successfully');
                this.userProfilePasswordForm.reset();
              }
  
            }, (err) => { this._errHandler.errorHandler(err) });
  
    }

}
