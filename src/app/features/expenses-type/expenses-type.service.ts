import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { ExpensesType } from './expenses-type.model';
import { ExpensesCategories } from './../expenses-categories/expenses-categories.model';

import { environment } from './../../../environments/environment.prod';

interface  IDataResponse {
  count : number;
  data  : ExpensesType[];
}


interface IStatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class ExpensesTypeService {

  baseUrl : string = environment.target;
  
    constructor(private _http : HttpClient) { }
  
    getDataSource(paginator,sort,filter){
      const params = new HttpParams()
            .set('filter', filter)
            .append('limit', paginator.pageSize )
            .append('page', (paginator.pageIndex + 1) )
            .append('order', sort.direction || 'asc' )
            .append('field', sort.active || 'expenseName');
  
            return this._http.get<IDataResponse>(`${this.baseUrl}/expenses/type`,{ params: params });
    }

    getCategories(){
      return this._http.get<ExpensesCategories[]>(`${this.baseUrl}/expenses/categories/all`);
    }
  
    save(data : ExpensesType){
      return this._http.post<IStatusResponse>(`${this.baseUrl}/expenses/type`,data);
    }
  
    getData(id : number){
      return this._http.get<ExpensesType>(`${this.baseUrl}/expenses/type/${id}`);
    }
  
  
    update(data : ExpensesType){
      return this._http.put<IStatusResponse>(`${this.baseUrl}/expenses/type/${data.expenseId}`,data);
    }

}
