import { AxiosResponse } from "axios";
import axios from "axios";

import{
    getAll,
    getByColumn,
    addItem,
    deleteItem,
    updateItem,
    makeActiveItem,
    getActive
} from './baseService'
import { ISupplier } from '@/components/shared/table/Table.types';
import { getInventoryData } from "./inventoryService";
const SUPPLIER_PRODUCTS = "/supplier_products";
const TABLE_NAME = "suppliers"
const url = process.env.REACT_APP_URL || 'http://localhost:8888'


export const getAllSuppliers = () => {
  return getAll(`${TABLE_NAME}`).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};

export const deleteRow = (id: number) => {
  return deleteItem(`${TABLE_NAME}`, id);
};
export const deleteSupplierProduct = (id: number) => {
  return deleteItem(`${TABLE_NAME + SUPPLIER_PRODUCTS}`, id);
};

export const addRow = (data: any) => {
  return addItem(`${TABLE_NAME}`, data);
};
export const addSupplierProduct = (data: any) => {
  return addItem(TABLE_NAME+SUPPLIER_PRODUCTS, data);
};

export const updateRow = (id: number, data: any) => {
  return updateItem(`${TABLE_NAME}`, id, data);
};
export const updateSupplierProduct = (id: number, data: any) => {
  return updateItem(TABLE_NAME+SUPPLIER_PRODUCTS, id, data);
};

export const getSupplierByColumn = async (column:string, value:string|number) => {
    return await getByColumn(TABLE_NAME, column, value).then((res: AxiosResponse<any, any>) => {
        return res.data;
    })
}
export const getActiveSupplier = async () => {
  return await getActive(TABLE_NAME).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};
export const getByColumnSupplier = async (
  column: string,
  value: string | number
) => {
  return await getByColumn(TABLE_NAME + "/supplier", column, value).then(
    (res: AxiosResponse<any, any>) => {
      return res.data;
    }
  );
};

export const getSupplierProducts = async (supplierId: any) => {
  return await getByColumn(
    TABLE_NAME + SUPPLIER_PRODUCTS,
    "supplier_id",
    supplierId
  ).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};

export const getInventory=()=>{
  return getInventoryData()
}
export const makeActive = async (obj: ISupplier) => {
  return await makeActiveItem(TABLE_NAME, obj);
};

export const checkSupplier = (id: number) => {
  return axios.get(`${url}/${TABLE_NAME}/${id}`).catch((error) => {
    return Promise.reject(error);
  });
};
