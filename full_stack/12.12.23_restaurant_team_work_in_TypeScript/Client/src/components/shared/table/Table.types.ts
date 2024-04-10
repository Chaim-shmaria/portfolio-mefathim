import { IDish } from "@/dataTypes/dish";
import { SetStateAction } from "react";

export type SupplierOrders = {
  name: "הזמנות";
  values: ISupplierOrder[];
  onAdd: (a: any) => void;
  onDelete: (num: any) => void;
  onEdit: (obj: any) => void;
  activeMode?: boolean;
  setMode?: React.Dispatch<SetStateAction<boolean>>;
  makeActive?: (id: number) => void;
  color?: (
    field: any,
    quantity: any,
    order_threshold: any
  ) => string | undefined;
  makeActiveData?: (obj: any) => void;
  clickRow?: (obj: any) => void;
};

export type productOrder = {
  name: "הזמנה חדשה";
  values: ISupplierNewOrder[];
  onAdd: () => void;
  onDelete: () => void;
  onEdit: () => void;
  handleData: any;
  activeMode: boolean;
  setMode: React.Dispatch<SetStateAction<boolean>>;
  makeActive?: (id: number) => void;
  color?: (
    field: any,
    quantity: any,
    order_threshold: any
  ) => string | undefined;
  makeActiveData?: (obj: any) => void;
  clickRow?: (obj: any) => void;
};

export type Suppliers = {
  name: "ספקים";
  values: ISupplier[];
  onAdd: () => void;
  onDelete: (id: number | undefined) => Promise<void>;
  onEdit: (object: ISupplier) => void;
  activeMode: boolean;
  setMode: React.Dispatch<SetStateAction<boolean>>;
  makeActive?: (id: number) => void;
  color?: (
    field: any,
    quantity: any,
    order_threshold: any
  ) => string | undefined;
  makeActiveData?: (obj: any) => void;
  clickRow?: (obj: any) => void;
};

export interface ISupplier {
  [x: string]: any; // Necessary to identify the width in general
  id?: number;
  business_number: string;
  supplier_name: string;
  contact_name: string;
  email: string;
  address: string;
  phone_number: string;
  min_order: number;
  is_active: boolean;
}

export type Products = {
  name: "מוצרים";
  values: IProducts[];
  onAdd: (new_object: any) => void;
  onDelete: (id: number) => void;
  onEdit: (row: object) => void;
  activeMode?: boolean;
  setMode?: React.Dispatch<SetStateAction<boolean>>;
  makeActive?: (id: number) => void;
  color?: (
    field: any,
    quantity: any,
    order_threshold: any
  ) => string | undefined;
  makeActiveData?: (obj: any) => void;
  clickRow?: (obj: any) => void;
};

export type Inventory = {
  name: "מלאי";
  values: IInventory[];
  onAdd: () => void;
  onDelete: (id: any) => void;
  onEdit: (id: any) => void;
  activeMode?: boolean;
  setMode?: React.Dispatch<SetStateAction<boolean>>;
  makeActive?: (id: number) => void;
  color?: (
    field: any,
    quantity: any,
    order_threshold: any
  ) => string | undefined;
  makeActiveData?: (obj: any) => void;
  clickRow?: (obj: any) => void;
};

export type User = {
  name: "משתמשים";
  values: IUser[];
  onAdd: () => void;
  onDelete: (num: number) => void;
  onEdit: (object: IUser) => void;
  activeMode?: boolean;
  setMode?: React.Dispatch<SetStateAction<boolean>>;
  makeActive?: (id: number) => void;
  color?: (
    field: any,
    quantity: any,
    order_threshold: any
  ) => string | undefined;
  makeActiveData?: (obj: any) => void;
  clickRow?: (obj: any) => void;
};

export type RestaurantProps =
  | SupplierOrders
  | productOrder
  | Suppliers
  | Products
  | Inventory
  | User;

export interface ISupplierNewOrder {
  [x: string]: any; // Necessary to identify the width in general
  supplier_id?: number;
  supplier_name: string;
  size_type: string;
  price: number;
  mkt: number;
  is_active?: boolean;
}
export interface ISupplierOrder {
  [x: string]: any; // Necessary to identify the width in general
  order_number: string;
  item_count: number;
  order_date: string;
  estimated_amount: number;
  status: string;
  is_active?: boolean;
}

export interface IInventory {
  [x: string]: any; // Necessary to identify the width in general
  id: number;
  name: string;
  category: string;
  quantity: number;
  size_type: string;
  order_threshold: number;
  is_active?: boolean;
}

export const enum Role {
  MANAGER = "מנהל",
  COOK = "טבח",
  WAITER = "מלצר",
}

export interface IUser {
  [x: string]: any; // Necessary to identify the width in general
  id: number | null;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  username: string;
  password: string;
  role: Role;
  is_active?: boolean;
}

export interface IProducts {
  [x: string]: any; // Necessary to identify the width in general
  id?: number;
  name: string;
  inventory_id: number;
  category: string;
  size: number; // optional
  n_unit: number; // optional ""
  size_type: string; //optional ""
  mkt: number;
}

export type RestaurantObjects =
  | IUser
  | IInventory
  | ISupplierOrder
  | ISupplier
  | IProducts
  | ISupplierNewOrder
  | IDish;
