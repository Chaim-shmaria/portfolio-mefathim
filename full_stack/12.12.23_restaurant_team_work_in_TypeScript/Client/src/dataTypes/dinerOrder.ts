import { IDish,orderDish } from "./dish";


export interface IDinerOrder {
  id: number;
  total: number;
  table_name: string;
  table_id: number
  waiter_id: number;
  waiter_name: string;
  n_diners: number;
  paid: number;
  timestamp: string;
}


export  interface IFullDinerOrder extends IDinerOrder {
  dishes: orderDish[];
}

export  interface IFull {
  order:IDinerOrder;
  dishes:orderDish[];
}
