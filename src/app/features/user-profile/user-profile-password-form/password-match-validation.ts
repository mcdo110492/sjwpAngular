import {AbstractControl} from '@angular/forms';


export class PasswordValidation {

    static MatchPassword(ac: AbstractControl) {
       let password = ac.get('newPassword').value; // to get value in input tag
       let confirmPassword = ac.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            
            ac.get('confirmPassword').setErrors( {matchPassword: true} )
        } else {
            
            return null
        }
    }
}