import { AxiosResponse } from "axios";
import { getAll, getByColumn, addItem, deleteItem, updateItem, getActive } from "./baseService";


export const getCategories = () => {
  return getAll('dishes_categories').then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return [];
    }
  });
};