

import { ExpensesType } from './../expenses-type/expenses-type.model';

export class ExpensesIndividual {
    items       :   ExpensesType;
    totalCost   :   number;
}

export class ExpensesByCategory {
    itemName    :   string;
    totalCost   :   number;
    isCategory  :   boolean;
}