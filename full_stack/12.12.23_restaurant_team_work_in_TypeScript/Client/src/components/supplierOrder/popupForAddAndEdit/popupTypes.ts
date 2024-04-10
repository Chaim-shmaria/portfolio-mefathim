import { ISupplierOrder } from "../../shared/table/Table.types";


export type ProductOrder = {
    name: "הזמנה חדשה";
    values: ISupplierOrder[];
    onAdd: () => void;
    onDelete: (a: any) => void;
    onEdit: () => void;
    handleToggle: () => void;
    fetchOrders: () => void;
    addOrEdit: string;
  };
  export type EditProductOrder = {
    name: "ערוך הזמנה חדשה";
    values: ISupplierOrder[];
    onAdd: () => void;
    onDelete: (a: any) => void;
    onEdit: () => void;
    handleToggle: () => void;
    fetchOrders: () => void;
    addOrEdit: string;
  };
 export interface Supplier {
    id: number;
    name: string;
    price: number;
  }
  
 export interface Order {
    amount: number;
    mkt: number;
    name: string;
    size_type: string;
    sum: number;
    supplier_id: number;
    suppliers: Supplier[];
  }
  
 export interface ProcessedOrder {
    order_id: number | string;
    amount: number;
    mkt: number;
    name: string;
    size_type: string;
    sum: number;
    supplier_name: string;
    supplier_id: number;
  }