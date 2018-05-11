import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AuthenticationService } from './../_services/authentication.service';
import { ProgressDialogService } from './../_services/progress-dialog.service';
import { ToasterService } from './../_services/toaster.service';
import { ErrorHandlerService } from './../_services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  constructor(private _fb : FormBuilder, 
              private _authService : AuthenticationService, 
              private _router : Router,
              private _loader : ProgressDialogService,
              private _errHandler : ErrorHandlerService,
              private _toastr : ToasterService ) { }

  ngOnInit() {

    this.checkLoginStatus();
    this.createForm();

  }

  createForm () {
    this.loginForm = this._fb.group({
      username :['', Validators.required],
      password : ['',Validators.required]
    });
  }



  login() {
    this._loader.openSpinner();
    this._authService
                .authenticateCredentials(this.loginForm.value)
                .subscribe( (res) => {
                  this._loader.closeSpinner();
                  if(res.status == 200){
                    const userStatus = {
                      token : res.token,
                      role  : res.role
                    };

                    
                    localStorage.setItem('presence',JSON.stringify(userStatus));
                    localStorage.setItem('profileName',res.profileName);
                    localStorage.setItem('profilePic',res.profilePic);
                    
                    
                    this.checkLoginStatus();
                  }
                  else {
                    this._toastr.showCustom('warning',"INVALID CREDENTIALS","Incorrect username or password.");
                  }
                  
                },
               (err) => { this._errHandler.errorHandler(err); this._loader.closeSpinner(); });
  }


  checkLoginStatus() {
    try {

      const obj = JSON.parse(localStorage.presence || null);
      
                if(obj){
                  if(obj.token){
                    switch (obj.role) {
                      case 1:
                        this._router.navigateByUrl('/main/baptism');
                        break;
                      case 2:
                        this._router.navigateByUrl('/main/baptism');
                        break;
                      
                      case 3:
                        this._router.navigateByUrl('/main/sales/pos');
                        break;
                  
                    }
                  }
                  
                }
      
    } catch (error) {
      localStorage.clear();

    }
    
  
  }

}
