

import { Minister } from './../minister/minister.model';


export class Death {
  death_id              : number;
  deceased_name         : string;
  residence             : string;
  date_death            : Date;
  place_burial          : string;
  date_burial           : Date;
  book_no               : number;
  page_no               : number;
  entry_no              : number;
  minister_id           : number;
  minister?              : Minister;
  created_at?           : Date;
  updated_at?           : Date;
}




