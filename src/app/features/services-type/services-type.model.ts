
import { ServicesCategories } from './../services-categories/services-categories.model';

export class ServicesType {
    serviceId           :   number;
    serviceCode         :   string;
    serviceName         :   string;
    cost                :   number;
    serviceQty?         :   number;
    serviceCategoryId?  :   number;
    service_category?   :   ServicesCategories;
    created_at?         :   Date;
    updated_at?         :   Date;

}