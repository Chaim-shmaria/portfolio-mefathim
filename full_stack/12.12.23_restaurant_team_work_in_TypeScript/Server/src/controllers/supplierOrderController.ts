import db from "../dbObj";

import {
  selectAll,
  insertRow,
  selectByColumn,
  updateRow,
  fakeDelete,
} from "../baseServer";
import express, { Request, Response } from "express";
import { error } from "console";

const TABLE_NAME = "supplier_orders";
const PRODUCR_ORDER_TABLE = "supplier_order_product";
const router = express.Router();
const currentTimestamp = new Date();
const formattedDate = currentTimestamp.toLocaleDateString("en-US", {
  timeZone: "Asia/Jerusalem",
});

const getAllSupplierOrder = async (req: Request, res: Response) => {
  const resArray = await selectAll(`${TABLE_NAME}`);
  try {
    res.status(200).json(resArray);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getDataByColunm = async (req: Request, res: Response) => {
  const resArray = await selectByColumn(`${TABLE_NAME}`, "is_active", 1);

  try {
    res.status(200).json(resArray);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSupplierOrder = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    fakeDelete(`${TABLE_NAME}`, id);

    res.status(200).send("supplierOrder deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateSupplierOrder = (req: Request, res: Response) => {
  updateRow(`${TABLE_NAME}`, req.body, "id", req.params.id);
  try {
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).json(error);
  }
};

//the following function is for new order in supplier order

//get data of choosen product in new order
const dataOfProduct = async (req: Request, res: Response) => {
  const id: any = req.params.id;

  const resArray = processProductData(await selectById(id));

  try {
    res.status(200).json(resArray);
  } catch (error) {
    res.status(500).json(error);
  }
};

const processOrderData = (data: any, lastID: any): any[] => {
  return data.map((order: any) => {
    return {
      order_id: lastID,
      product_id: order.product_id,
      amount: order.amount,
      sum: order.sum,
      supplier_id: order.supplier_id,
    };
  });
};

async function dataForSuplierOrdersTable(data: any, res: Response) {
  const supplierObjectsSort: any = {};
  let customErrorMessage = "";

  for (const obj of data) {
    const id = obj.supplier_id;
    if (!supplierObjectsSort[id]) {
      supplierObjectsSort[id] = [];
    }
    supplierObjectsSort[id].push(obj);
  }

  for (const array of Object.values(supplierObjectsSort)) {
    try {
      await processSupplierOrder(array, res);
    } catch (error: any) {
      console.error(error.message);
      customErrorMessage = error.message;
      break;
    }
  }

  if (customErrorMessage) {
    res.status(400).send(customErrorMessage);
  } else {
    res.status(200).send("");
  }
}

async function processSupplierOrder(array: any, res: Response) {
  try {
    const calculatedData = await calculateTotalAndAmount(array);

    const id = await insertRowToSupplier(`${TABLE_NAME}`, calculatedData);

    const resultArray = processOrderData(array, id);

    for (const results of resultArray) {
      await insertRow(PRODUCR_ORDER_TABLE, results);
    }
  } catch (error: any) {
    if (error.message.includes("מינימום")) {
      throw new Error(error.message);
    } else {
      console.error("Error processing supplier order:", error);
      throw error;
    }
  }
}

async function calculateTotalAndAmount(data: any) {
  let total_amount = 0;
  let item_count = 0;

  data.forEach((obj: any) => {
    total_amount += obj.sum;
    item_count += obj.amount;
  });
  let supplier_row: any = await selectByColumn(
    `${"suppliers"}`,
    "id",
    data[0].supplier_id
  );
  const minOrder = supplier_row[0].min_order;

  if (total_amount < minOrder) {
    throw new Error(
      `   לספק ${supplier_row[0].supplier_name} קיים מינימום הזמנה על סך ${
        supplier_row[0].min_order
      } ש"ח. חסר להזמנה: ${supplier_row[0].min_order - total_amount} ש"ח `
    );
  } else {
    const resultObject = {
      supplier_id: data[0].supplier_id,
      supplier_name: supplier_row[0].supplier_name,
      status: "ממתין לשליחה",
      is_active: true,
      total_amount: total_amount,
      date_ordered: formattedDate,
      item_count: item_count,
    };

    return resultObject;
  }
}

//post data of new order in the relevant tables
const addNewOrder = async (req: Request, res: Response) => {
  try {
    await dataForSuplierOrdersTable(req.body, res);
  } catch (error: any) {}
};

function processProductData(rows: any[]): any | null {
  if (rows.length > 0) {
    const productInfo = {
      id: rows[0].id,
      name: rows[0].name,
      mkt: rows[0].mkt,
      size_type: rows[0].size_type,
    };

    const suppliersInfo = rows.map((row) => ({
      id: row.supplier_id,
      name: row.supplier_name,
      price: row.price,
    }));

    const resultObject = {
      product: productInfo,
      suppliers: suppliersInfo,
    };
    return resultObject;
  } else {
    return null;
  }
}
const getEditData = async (req: Request, res: Response) => {
  const result = await getDataById(req.params.id);
  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export function getDataById(id: any) {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT p.mkt,
        p.name AS product_name,
        s.supplier_name,
        s.email AS supplier_email,  
        p.size_type,
        sop.amount,
        sop.sum,
        sop.order_id,
        so.total_amount,
        so.status 
      FROM supplier_order_product sop
      INNER JOIN products p ON sop.product_id = p.id
      INNER JOIN supplier_orders so ON sop.order_id = so.id
      INNER JOIN suppliers s ON so.supplier_id = s.id
      WHERE sop.order_id = ?`;

    db.query(query, [id], (err: any, rows: any) => {
      db.query(query, [id], (err: any, rows: any) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  });
}

export function insertRowToSupplier(tableName: string, item: object) {
  return new Promise<number>((resolve, reject) => {
    const keys = Object.keys(item);
    const values = Object.values(item);
    const numOfValues = values.map(() => `?`);

    db.query(
      `INSERT INTO ${tableName}(${keys}) VALUES (${numOfValues})`,
      values,
      (error: { message: any }, results: any) => {
        if (error) {
          console.log(error.message);
          reject(error.message);
        }
        resolve(results.insertId);
      }
    );
  });
}

function selectById(id: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT DISTINCT
    supplier_products.supplier_id, 
    products.mkt,
    suppliers.supplier_name,
    products.size_type,
    supplier_products.price,
    products.name
    FROM supplier_products
    INNER JOIN products ON supplier_products.product_id = products.id
    INNER JOIN suppliers ON supplier_products.supplier_id = suppliers.id
    WHERE supplier_products.product_id = ?;

    `;

    db.query(query, [id], (error: any, rows: any[]) => {
      db.query(query, [id], (error: any, rows: any[]) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

async function updateInventory(req: Request, res: Response) {
  const id = req.body.value;

  try {
    const orderProducts: any = await queryDatabase(
      `SELECT * FROM supplier_order_product WHERE order_id = ${id}`
    );
    for (const orderProduct of orderProducts) {
      const { product_id, amount } = orderProduct;

      const product: any = await queryDatabase(
        `SELECT inventory_id FROM products WHERE id = ${product_id}`
      );

      const inventoryId = product[0].inventory_id;

      await queryDatabase(
        `UPDATE inventory SET quantity = quantity + ${amount} WHERE id = ${inventoryId}`
      );
    }

    console.log("Inventory updated successfully!");
  } catch (error) {
    console.error("Error updating inventory:", error);
  }
}

function queryDatabase(sql: any) {
  return new Promise((resolve, reject) => {
    db.query(sql, (error: any, results: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

router.get("/all", getAllSupplierOrder);
router.get("/editOrder/:id/all", getEditData);

router.get("/byColumn", getDataByColunm);
router.get("/active", getDataByColunm);

router.put("/update/:id", updateSupplierOrder);
router.delete("/:id", deleteSupplierOrder);

router.get("/newOrder/:id", dataOfProduct);
router.post("/new", addNewOrder);
router.post("/inventory/add", updateInventory);

module.exports = router;
