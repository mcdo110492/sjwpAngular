
import { ExpensesCategories } from './../expenses-categories/expenses-categories.model';


export class ExpensesType {
    expenseId          :   number;
    expenseCode        :   string;
    expenseName        :   string;
    expenseCategoryId? :   number;
    expense_category?  :   ExpensesCategories; 
    created_at?        :   Date;
    updated_at?        :   Date;
}