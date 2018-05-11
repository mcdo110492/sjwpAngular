import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Expenses } from './expenses.model';
import { ExpensesType } from './../expenses-type/expenses-type.model';

import { environment } from './../../../environments/environment.prod';


interface  IDataResponse {
  count : number;
  data  : Expenses[];
}

interface  IDataResponsePrint {
  netCost   : number;
  data      : Expenses[];
}


interface IStatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class ExpensesService {

  baseUrl: string = environment.target;
  
    constructor(private http : HttpClient) {}
  
    getDataSource(paginator,sort,filter, dateExpense) {
          const data = {
            filter : filter,
            limit : paginator.pageSize,
            page : paginator.pageIndex,
            order : sort.direction || 'asc',
            field : sort.active || 'expenserrNo',
            dateExpense : dateExpense
          }
  
        return this.http
                      .post<IDataResponse>(`${this.baseUrl}/expenses/list`,data);
  
    }

    getExpenses(){
      return this.http
                     .get<ExpensesType[]>(`${this.baseUrl}/expenses/type/all`);
    }

    getPrint(dateExpense){
      const data = { dateExpense : dateExpense };
      return this.http 
                 .post<IDataResponsePrint>(`${this.baseUrl}/expenses/print`,data);
    }

    getDetails(id : number){

      return this.http.get<Expenses>(`${this.baseUrl}/expenses/details/${id}`);

    }

    save(data : Expenses){
      return this.http.post<IStatusResponse>(`${this.baseUrl}/expenses/save`,data);
    }

    update(data : Expenses){
      return this.http.put<IStatusResponse>(`${this.baseUrl}/expenses/update/${data.expenseCostId}`,data);
    }


    changeStatus(id :number , status : number){
      const data = {
            expenseCostId  : id,
            status         : status
      };

      return this.http
                     .put<IStatusResponse>(`${this.baseUrl}/expenses/status`,data);
    }


  
}
