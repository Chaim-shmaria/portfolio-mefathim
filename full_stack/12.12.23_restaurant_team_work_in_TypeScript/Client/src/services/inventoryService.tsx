import { Inventory } from "@/components/shared/table/Table.types";
import {
  getAll,
  makeActiveItem,
  deleteItem,
  addItem,
  updateItem,
  getActive,
} from "./baseService";

import { AxiosResponse } from "axios";
const tableName = "inventory";

export const getInventoryData = () => {
  return getAll(tableName).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};
export const getInventoryByColumn = () => {
  return getActive(tableName).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};
export const getInventoryCategories = () => {
  return getAll("inventory/reference_tables").then(
    (res: AxiosResponse<any, any>) => {
      return res.data;
    }
  );
};

export const deleteRow = (id: number) => {
  return deleteItem(tableName, id).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};

export const addRow = async (row: object) => {
  try {
    await addItem(tableName, row);
  } catch (error) {
    console.log(error);
  }
};

export const updateRow = (id: number, row: object) => {
  return updateItem(tableName, id, row);
};

export const makeActive = (obj: Inventory) => {
  return makeActiveItem(tableName, obj);
};
