
import { ExpensesType } from './../expenses-type/expenses-type.model';

export class Expenses {
    expenseCostId           :   number;
    expenseId               :   number;
    expenses?               :   ExpensesType;
    expenseCost             :   number;
    expenserrNo             :   number;
    details?                :   string;
    dateExpense             :   Date;
    status                  :   number;
    user_id?                :   number;
    created_at?             :   Date;
    updated_at?             :   Date;
}