
import { ServicesType } from './../services-type/services-type.model';

export class Pos {
    serviceSalesId       :   number;
    rrNo            :   number;
    dateIssued      :   Date;
    amountPaid      :   number;
    totalCost       :   number;
    customer?       :   string;
    status          :   number;
    user_id         :   number;
    services        :   ServiceItems[];
    created_at?     :   Date;
    updated_at?     :   Date;
}


 export class ServiceItems {
    serviceSaleItemId       :   number;
    serviceId               :   number;
    service_type?           :   ServicesType;
    serviceCost             :   number;
    serviceQty              :   number;
    serviceSalesId          :   number;
    created_at?             :   Date;
    updated_at?             :   Date;
}