import { NgModule } from '@angular/core';

import { SharedModule } from './../../shared/shared.module';
import { TitleBarModule } from './../title-bar/title-bar.module';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';

import { UserProfileService } from './user-profile.service';
import { UserProfilePasswordFormComponent } from './user-profile-password-form/user-profile-password-form.component';

@NgModule({
  imports: [
    SharedModule,
    TitleBarModule,
    UserProfileRoutingModule
  ],
  declarations: [UserProfileComponent, UserProfileFormComponent, UserProfilePasswordFormComponent],
  providers:[UserProfileService]
})
export class UserProfileModule { }
