import { IProduct } from "@/dataTypes/product";
import { AxiosResponse } from "axios";
import {
  getAll,
  addItem,
  deleteItem,
  updateProducts,
  makeActiveItem,
  getActive,
  updateLink,
} from "services/baseService";

const TABLE_NAME = "products";
const LINK_TABLE = "supplier_products";

export const getData = async () => {
  try {
    const response = await getAll(`${TABLE_NAME}`);
    const transformedData = transformData(response.data);
    return transformedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const transformData = (data: any) => {
  return data.map((product: any) => ({
    ...product,
    size_and_type: `${product.size} ${product.size_type}`,
  }));
};

export const getOtherData = (tableName: string) => {
  return getAll(tableName).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};

export const getActiveProducts = () => {
  return getActive(TABLE_NAME).then(
    (res: AxiosResponse<any, any>) => {
      return res.data;
    }
  );
};
export const deleteData = async (num: number) => {
    await console.log(typeof num, "num");
    return deleteItem(`${TABLE_NAME}`, num);
  
};

export const addProduct = async (newRow: object) => {
  try {
    return await addItem(TABLE_NAME, newRow);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (object: any) => {
  updateProducts(`${TABLE_NAME}`, object, object.id);
};

export const makeActive = async (obj: IProduct) => {
  return await makeActiveItem(TABLE_NAME, obj);
};


export const getProductByColumn = () => {
  return getActive(TABLE_NAME).then((res: AxiosResponse<any, any>) => {
    return res.data;
  });
};

export const updateLInkTable = (object: any) => {
  updateLink(`${TABLE_NAME}`, object);
};
