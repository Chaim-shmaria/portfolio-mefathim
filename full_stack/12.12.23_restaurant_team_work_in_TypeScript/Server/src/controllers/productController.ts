import { OK } from "sqlite3";
import {
  insertRow,
  updateRow,
  fakeDelete,
  makeActive,
  getProducts,
  getActiveProducts,
  deleteRow,
} from "../baseServer";
import express, { Request, Response } from "express";
import db from "../dbObj";

const TABLE_NAME = "products";
const LINK_TABLE = "supplier_products";

const router = express.Router();

const getAll = async (req: Request, res: Response) => {
  const resArray = await getProducts();
  try {
    res.status(200).json(resArray);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getActives = async (req: Request, res: Response) => {
  const resArray = await getActiveProducts();
  try {
    res.status(200).json(resArray);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await fakeDelete(`${TABLE_NAME}`, id);
    res.status(200).send("product deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const AddProduct1 = async (req: Request, res: Response) => {
  try {
    const id = await addProduct(`${TABLE_NAME}`, newProduct(req.body));
    const body = req.body.suppliers.map((object: any) => {
      const row = rowsForlinkTable(id, object, req.body.category);
      insertRow(LINK_TABLE, row);
    });

    res.status(200).send("ok");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const newProduct = (formData: any) => {
  return {
    name: formData.product.name,
    category: formData.product.category,
    inventory_id: formData.product.inventory_id,
    size: formData.product.size,
    n_unit: formData.product.n_unit,
    size_type: formData.product.size_type,
    mkt: formData.product.mkt,
    is_active: true,
  };
};

const rowsForlinkTable = (id: number, data: any, category: any) => {
  return {
    product_id: id,
    supplier_id: data.id,
    price: data.price,
    category: category,
  };
};

export function addProduct(tableName: string, item: object) {
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
        console.log(results.insertId);
        resolve(results.insertId);
      }
    );
  });
}

const updateProduct = (req: Request, res: Response) => {
  const product = req.body
  updateRow(`${TABLE_NAME}`, product,'id', product.id);
  res.status(500);
};

const makeActiveProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await makeActive(`${TABLE_NAME}`, id);
    res.status(200).send("product status has changed successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductSuppliers = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const query = `
  SELECT
    suppliers.id as supplier_id,
    suppliers.supplier_name,
    supplier_products.price
  FROM suppliers
  INNER JOIN supplier_products ON suppliers.id = supplier_products.supplier_id
  WHERE supplier_products.product_id = ?;
`;

  db.query(query, [productId], (err: any, rows: any) => {
    if (err) {
      console.error(`Error executing MySQL query: ${err.message}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ rows });
  });
};

const updateProductSuppliers = async(req: any, res: any) => {
  const suppliersArray = req.body.data;
  console.log(req.body.data)
  const productId = req.params.id;
  await deleteFromLink(LINK_TABLE, productId);
  suppliersArray.map((supplier:any)=>{
    insertRow(LINK_TABLE, supplier )
  })
};

export function deleteFromLink(tableName: string, id: string) {
  db.query(`DELETE FROM ${tableName} WHERE product_id = ${id}`, function (error: any) {
    if (error) {
      console.error(error.message);
    }
    console.log(`Row ${id} has been deleted`);
  });
}

const updateProductDirectly = async(req: Request, res: Response) => {
  try  {
    const id = req.params.id 
    updateRow(`${TABLE_NAME}`,req.body,'id', id)
    res.status(200).send('ok')
  } catch (error) {
    res.status(500).json({ "error": error }); 
  } 
}

router.get("/all", getAll);
router.get("/:table", getActives);
router.get("/getSupplierNames/:id", getProductSuppliers);
router.post("/add", AddProduct1);
router.put("/update", updateProduct);
router.put ('/update/:id', updateProductDirectly)
router.put("/updateLinkTable/:id", updateProductSuppliers)
router.delete("/:id", deleteProduct);
router.put("/active/:id", makeActiveProduct);
module.exports = router;
