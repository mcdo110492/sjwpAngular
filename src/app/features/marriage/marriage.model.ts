
import { Minister } from './../minister/minister.model';


export class Marriage {

    marriage_id         : number;
    husband_id          : number;
    wife_id             : number;
    date_married        : Date;
    sponsors?           : string;
    book_no             : number;
    page_no             : number;
    entry_no            : number;
    remarks?            : string;
    minister_id         : number;
    minister_name?      : string;
    status?             : number;
    created_at?         : Date;
    updated_at?         : Date;
    husband_name        : string;
    husband_father_name : string;
    husband_mother_name : string;
    husband_residence   : string;
    husband_religion    : string;
    husband_date_birth  : Date;
    wife_name           : string;
    wife_father_name    : string;
    wife_mother_name    : string;
    wife_residence      : string;
    wife_religion       : string;
    wife_date_birth     : Date;
}


