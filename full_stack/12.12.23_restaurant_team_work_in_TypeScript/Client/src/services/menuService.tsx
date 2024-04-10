import { dishInventory } from "@/dataTypes/inventory";
import { getAll, addItem, updateItem, getActive, getByColumn } from "./baseService";
import { IDish } from "@/dataTypes/dish";
import { AxiosResponse } from "axios";

const TABLE_NAME = "dishes"

export const getMenuData = async () => {
  try {
    const response = await getAll(TABLE_NAME);
    if (response && response.data) {
      return response.data;
    } else {
      console.error("Error: No data in response");
      return [];
    }
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return [];
  }
};

export const getActiveDishes = () => {
  return getActive(TABLE_NAME).then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return [];
    }
  });
};

export const navigateData = async (dish: IDish, inventories: dishInventory[]) => {
  dish = {...dish, picture: dish.picture || 'logo3.jpg'}
  const data: [IDish, dishInventory[]] = [dish, inventories];
  if (dish.id) {
    const resUpdateDish = await updateNewDish(dish, inventories);
    return resUpdateDish;
  } else {
    const resAddNewDish = await addNewDish(data);
    return resAddNewDish;
  }
};

export const addNewDish = async (data: [IDish, dishInventory[]]) => {
  try {
    const response = await addItem(TABLE_NAME, data);
    return response;
  } catch (error) {
    console.error("Error addNewDish:", error);
  }
};

export const updateNewDish = async (
  dish: IDish,
  inventories: dishInventory[]
) => {
  try {
    if (dish.id === undefined) {
      throw new Error("Dish ID is undefined");
    }

    const response = await updateItem(TABLE_NAME, dish.id, [dish, inventories]);
    return response;
  } catch (error) {
    console.error("Error updateNewDish:", error);
  }
};

export const getDishWithInentories = (id: number) => {
  return getByColumn('dishes', 'id', id).then((res: AxiosResponse | any) => {
    if (res && 'data' in res) {
      return res.data;
    } else {
      return {dish: {}, inventories:[]};
    }
  });
};
