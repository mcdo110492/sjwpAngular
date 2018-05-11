
import { ServicesType } from './../services-type/services-type.model';

export class SalesIndividual {
    items       :   ServicesType;
    totalCost   :   number;
}

export class SalesByCategory {
    itemName       :   string;
    totalCost      :   number;
    isCategory     :   boolean;
}