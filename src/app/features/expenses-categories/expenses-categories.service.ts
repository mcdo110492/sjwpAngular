import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { ExpensesCategories } from './expenses-categories.model';

import { environment } from './../../../environments/environment.prod';

interface  IDataResponse {
  count : number;
  data  : ExpensesCategories[];
}


interface IStatusResponse {
  status  : number;
  message : string;
}

@Injectable()
export class ExpensesCategoriesService {

  baseUrl : string = environment.target;
  
    constructor(private _http : HttpClient) { }
  
    getDataSource(paginator,sort,filter){
      const params = new HttpParams()
            .set('filter', filter)
            .append('limit', paginator.pageSize )
            .append('page', (paginator.pageIndex + 1) )
            .append('order', sort.direction || 'asc' )
            .append('field', sort.active || 'expenseCategoryName');
  
            return this._http.get<IDataResponse>(`${this.baseUrl}/expenses/categories`,{ params: params });
    }
  
    save(data : ExpensesCategories){
      return this._http.post<IStatusResponse>(`${this.baseUrl}/expenses/categories`,data);
    }
  
    getData(id : number){
      return this._http.get<ExpensesCategories>(`${this.baseUrl}/expenses/categories/${id}`);
    }
  
  
    update(data : ExpensesCategories){
      return this._http.put<IStatusResponse>(`${this.baseUrl}/expenses/categories/${data.expenseCategoryId}`,data);
    }

}
