import * as base from "../baseServer";
import { Router, Request, Response } from "express";
import { updateDishesInStock } from "../query_hub";
import { Table, injectNames } from '../utils';

const router = Router();
const TABLE_NAME = "dishes"
const getAvailableDishes = async (req: Request, res: Response) => {
  try {
    const table = await base.selectAll(TABLE_NAME) as Table;
    const result = await injectNames(table, 'dishes_categories', 'category_id', 'category_name', 'category_name')
    res.status(200).json(result)
  } catch (error) {
    console.error(error);
    res.status(500).send("500");
  }
};


const getActiveDishes = async (req: Request, res: Response) => {
  try {
    const allDishes = await base.selectAll(TABLE_NAME) as Table; 
    const table = allDishes.filter(dish => dish.in_stock > 0);
    const result = await injectNames(table, 'dishes_categories', 'category_id', 'category_name', 'category_name')
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
};


const getDish =  async (req: Request, res: Response) => {
  try {
      const dishId = Number(req.query.id);

      let dish = await base.selectByColumn(TABLE_NAME, 'id', dishId) as Table;
      if (!dish || !Array.isArray(dish) || dish.length === 0) {
          return res.status(404).json({ message: 'dish not found' });
      }
      let dishInventories= await base.selectByColumn('dishes_inventory', 'dish_id', dishId) as Table
      dish= await injectNames(dish, 'dishes_categories', 'category_id', 'category_name', 'category_name')
      dishInventories = await injectNames(dishInventories, 'inventory', 'inventory_id', 'name', 'inventory_name')
      dishInventories = await injectNames(dishInventories, 'inventory', 'inventory_id', 'size_type', 'size_type_id')
      dishInventories = await injectNames(dishInventories, 'size_types', 'size_type_id', 'type', 'size_type_name')

      res.status(200).send({dish: dish[0], inventories: dishInventories});
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data' });
  }
};

const addDish = async (req: Request, res: Response) => {
  try {
    const [dish, inventory] = req.body;
    const result = await base.insertRow(TABLE_NAME, dish);
    const newDishId = result.insertId;

    await auxiliaryFunc(newDishId, inventory);

    res.status(200).json({ success: true, newDishId });
  } catch (error) {
    console.error("Error adding dish:", error);
    res.status(501).json({ success: false, error: "Internal Server Error" });
  }
};

const editDish = async (req: Request, res: Response) => {
  try {
    const [dish, inventory] = req.body;
    delete dish.category_name
    await base.updateRow(TABLE_NAME, dish, "id", dish.id);
    await base.deleteRow("dishes_inventory", "dish_id", dish.id);
    await auxiliaryFunc(dish.id, inventory);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error update dish:", error);
    res.status(501).json({ success: false, error: "Internal Server Error" });
  }
};

const auxiliaryFunc = async (id: number, data: any) => {
  console.log(data)
  try {
    for (const item of data) {
      const linkingRow = {
        dish_id: id,
        inventory_id: item.inventory_id,
        quantity: item.quantity,
        necessary: item.necessary,
      };
      await base.insertRow("dishes_inventory", linkingRow);
    }
    await base.runQuery(updateDishesInStock);
    return
  } catch (error) {
    console.error("Error insertRow", error);
  }
};

router.get("/all", getAvailableDishes);
router.post("/add", addDish);
router.put("/update/:id", editDish);
router.get("/active", getActiveDishes);
router.get('/', getDish)

export default router;
