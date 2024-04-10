import { addItem, deleteItem, getAll, updateItem } from "./baseService";
import { ITable } from "@/dataTypes/table";
import { IDinerOrder } from "@/dataTypes/dinerOrder";

export type RestaurantSquare = {
  order?: IDinerOrder;
  config: ITable;
};

export const getDataTable = () => {
  return getAll("tables").then((res) => {
    if (res && res.status === 200) {
      return res.data;
    }
    return [];
  });
};

export const deleteTable = (id: number): Promise<boolean> => {
  return deleteItem("tables", id).then((res) => {
    if (res && res.status === 200) {
      return true;
    }
    console.error(`Failed to delete table with ID ${id}.`);
    return false;
  });
};

export const addTable = (data: object): Promise<number | boolean> => {
  return addItem("tables", data).then((res) => {
    if (res && res.status === 200) {
      return true;
    }
    console.error("Failed to add table.");
    return false;
  });
};

export const updateTable = (id: number, data: ITable): Promise<boolean> => {
  return updateItem("tables", id, data).then((res) => {
    if (res && res.status === 200) {
      return true;
    }
    console.error(`Failed to update table with ID ${id}.`);
    return false;
  });
};

export const unseatTable = (id: number): Promise<boolean> => {
  return updateItem("tables/unseat", id, {}).then((res) => {
    if (res && res.status === 200) {
      return true;
    }
    console.error(`Failed to unseat table with ID ${id}.`);
    return false;
  });
};
