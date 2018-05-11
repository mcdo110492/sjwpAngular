import { Component, OnInit, Output,EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  userProfileName : string = localStorage.profileName;
  userProfilePic  : string = `assets/${localStorage.profilePic}`;

  // Emit The Event to the Parent
  @Output() onSideNavIsOpen = new EventEmitter <boolean> ();
  
  constructor(private _router : Router) { }

  ngOnInit() {
  }

  //Event that will be pass to the Parent Component to be use
  sideNavToggle () {
    this.onSideNavIsOpen.emit();
  }

  //Logout and Clear all the Local Storage Items and Navigate back to the Login
  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }

  

}
