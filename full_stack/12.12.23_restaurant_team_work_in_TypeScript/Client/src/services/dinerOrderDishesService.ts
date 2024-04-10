import { updateItem } from "./baseService";
import { orderDish } from "@/dataTypes/dish";

export const addReduceAvailability = async (id: number, dish: {}) => {
  try {
    const response = await updateItem("diners_orders_dishes/dish", id, dish);
    return response;
  } catch (error) {
    console.error("Error fetching response dish:", error);
  }
};

export const returnAvailability = async (dishes: orderDish[]) => {
  try {
    const response = await updateItem(
      "diners_orders_dishes/dishes",
      0,
      dishes.map(dish => ({...dish, state: false}))
    );
    return response;
  } catch (error) {
    console.error("Error fetching response dishes:", error);
  }
};
