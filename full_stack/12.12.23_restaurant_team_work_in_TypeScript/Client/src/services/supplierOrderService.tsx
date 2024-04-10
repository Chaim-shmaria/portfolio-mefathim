import supplierOrder from "@/components/supplierOrder/supplierOrder";
import { IsupplierOrder } from "@/dataTypes/supplyOrder";
import { Axios, AxiosResponse } from "axios";
import {
  getAll,
  getByColumn,
  addItem,
  deleteItem,
  updateItem,
  getByRow,
  addItemsToOrderTables,
  makeActiveItem,
  getActive,
} from "services/baseService";
const TABLE_NAME = "supplierOrder";
const INVENTORY_TABLE = "inventory";

export const getData = (str?: string) => {
  return getAll(`${TABLE_NAME}${str ? str : ""}`).then(
    (res: AxiosResponse<any, any>) => {
      console.log(res.data);
      return res.data;
    }
  );
};
export const getActiveSupplierOrder = () => {
  return getActive(TABLE_NAME).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};
export const getDataByCulomn = () => {
  return getByColumn(`${TABLE_NAME}/byColumn`, "is_active", "true").then(
    (res: AxiosResponse<any, any>) => {
      return res.data;
    }
  );
};
export const deleteData = (num: number) => {
  if (window.confirm("האם אתה בטוח שברצונך למחוק?")) {
    return deleteItem(`${TABLE_NAME}`, num);
  } else {
    return null;
  }
};

export const addData = async (newRow: object) => {
  try {
    const a = await addItem(`${TABLE_NAME}`, newRow);
  } catch (error) {
    return error;
  }
};

export const updateData = (num: any, object: any) => {
  updateItem(`${TABLE_NAME}`, num, object);
};
export const makeActive = (obj: IsupplierOrder) => {
  return makeActiveItem(TABLE_NAME, obj);
};

//the following fuction use for add order supplier popup///////////
//in folder "popup for add and edit"

//get the data for the choosen product
//call in table.tsx


// export const addDataToOrderTables = async (data: any) => {
//   try {
//     const a = await addItemsToOrderTables(`${TABLE_NAME}`, data);
//   } catch (error:any) {
//     let minError = error.response.data;

//     return minError;
//   }
// };
export const addDataToOrderTables = async (data: any) => {
  try {
    const result = await addItemsToOrderTables(`${TABLE_NAME}`, data);
    
    return result;
  } catch (error:any) {
    let minError = error.response?.data || null;
    return minError;
  }
};

export const getDataForNewOrder = (id: any) => {
  return getByRow(`${TABLE_NAME}/newOrder`, id).then(
    (res: AxiosResponse<any, any>) => {
      return res.data;
    }
  );
};


export const getDataToEdit = (arg:any) => {
  return getByColumn(`${TABLE_NAME}/byColumn`, "order_id", `${arg}`).then(
    (res: AxiosResponse<any, any>) => {
      return res.data;
    }
  );
};
export const updateInventory = (id: any) => {
  addItem(`${TABLE_NAME}/${INVENTORY_TABLE}`, id);
};