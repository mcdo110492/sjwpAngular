


import { Minister } from './../minister/minister.model';

export class Baptism {
  baptism_id?    : number;
  child_name    : string;
  father_name   : string;
  mother_name   : string;
  birth_place?  : string;
  birthday?     : Date;
  baptism_date  : Date;
  book_no       : number;
  page_no       : number;
  entry_no      : number;
  sponsors?     : string;
  remarks?      : string;
  minister_id   : number;
  minister?     : Minister;
  created_at?   : Date;
  updated_at?   : Date;
}





