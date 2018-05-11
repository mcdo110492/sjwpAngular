import { Injectable } from '@angular/core';

import { CanActivate, CanActivateChild, CanLoad ,ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';

import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/first';


@Injectable()
export class AuthGuardStateService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private _authService : AuthenticationService, private _router : Router)  { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) : Observable<boolean> {
      
    return this.authenticate().first();

  }

  canActivateChild(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<boolean> {

    return this.canActivate(route,state);
    
  }

  canLoad(route : Route) : Observable<boolean> {
    
    return this.authenticate().first();
    
  }

  //Map the result of the service and check if the server return status 200 or and error status
  authenticate() : Observable<boolean> {

   return this._authService.checkValidity()
                           .mapTo(true) // return true if the server return status of 200
                           .catch( (err) => { // catch the http error status
                             localStorage.clear(); // clear the localStorage
                             this._router.navigateByUrl('/login'); // navigate to login if the token expires or invalid
                             return Observable.of(false); // return false to deactivate the route that is guarded
                           });
    

  }

  


}
