import { Router, Request, Response } from "express";
import { runQuery, selectByColumn, updateRow } from "../baseServer";
import { updateDishesInStock } from "../query_hub";

const router = Router();

export interface DishInventory {
  dish_id: number;
  inventory_id: number;
  quantity: number;
  in_stock: Boolean;
  necessary: Boolean;
}

const updateInventory = async (data: any) => {
  try {
    const dishInventories = (await selectByColumn(
      // need to change to dishes_inventory
      "dishes_inventory",
      "dish_id",
      data.dish_id
    )) as DishInventory[];
    for (const inventory of dishInventories) {
      const filteredObject = {
        id: inventory.inventory_id,
        quantity: inventory.quantity * data.amount,
      };

      // Adjust inventory quantity based on dish state
      const inventoryRow = (await selectByColumn(
        "inventory",
        "id",
        filteredObject.id
      )) as { quantity: number }[];
      let { quantity } = inventoryRow[0];

      if (data.state) {
        // Subtract quantity for ONUPDATE
        quantity -= filteredObject.quantity;
      } else {
        // Add quantity for HANDLEDELETE
        quantity += filteredObject.quantity;
      }

      await updateRow("inventory", { quantity },"id", filteredObject.id);
    }
  } catch (error) {}
};

const addReduceInStock = async (req: Request, res: Response) => {
  try {
    const { id, dish } = req.body;

    await updateInventory(dish);

    await runQuery(updateDishesInStock);
    res.status(200).send("200");
  } catch (error) {
    console.error(error);
    res.status(500).send("500");
  }
};

const handleCancelInStock = async (req: Request, res: Response) => {
  try {
    const dishes = req.body;
    console.log("dishes:", dishes);

    for (const item of dishes) {
      await updateInventory(item);
    }

    await runQuery(updateDishesInStock);
    res.status(200).send("200");
  } catch (error) {
    console.error(error);
    res.status(501).send("501");
  }
};

router.put("/dish/update/:id", addReduceInStock);
router.put("/dishes/update/:id", handleCancelInStock);

export default router;
