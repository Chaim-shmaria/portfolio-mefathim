import { Request, Response } from 'express';
import {
    selectAll,
    deleteRow,
    insertRow,
    updateRow,
    selectByColumn,
    fakeDelete,
    deleteRows,
    makeActive,
    SelectSupplierProducts,
    insertAndGetKey
} from "../baseServer"
import { error } from 'console';

const express = require("express");
const router = express.Router();
const TABLE_NAME = "suppliers"
const SUPPLIER_PRODUCTS='supplier_products'

const checkSupplier = async(id:string) => {
  const linkedOrders = await selectByColumn("supplier_orders","supplier_id", id,)
  if (Array.isArray(linkedOrders) && linkedOrders.length > 0) {
    const orderIds = linkedOrders.map(order => order.id).join(', ');
    return ({success: false,openOrders: orderIds}) 
  }else{
  return({success:true, openOrders:null})
}}

const deleteLinkedProducts = async(id:string) => {
  const linkedProducts = await selectByColumn(SUPPLIER_PRODUCTS,"supplier_id", id,)
  if (Array.isArray(linkedProducts) && linkedProducts.length > 0) {
  const productsIds = linkedProducts.map(product => product.id).join(', ');
  deleteRows(SUPPLIER_PRODUCTS,[productsIds]);
}
}

router.get('/all', async (req: Request, res: Response) => {
  try {
      const suppliers = await selectAll(`${TABLE_NAME}`);
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ "error": error }); 
    } 
});

router.get('/active', async (req: Request, res: Response) => {
  try {
      const suppliers = await selectByColumn(`${TABLE_NAME}`, "is_active", "1");
      res.status(200).json(suppliers);
    } catch (error) {
      res.status(500).json({ "error": error }); 
    } 
});

router.get('/supplier', async (req: Request, res: Response) => {
  const  id=String(req.query.id)
  try {
      const supplier = await selectByColumn(`${TABLE_NAME}`, "id", id);
      res.status(200).json(supplier);
    } catch (error) {
      res.status(500).json({ "error": error }); 
    } 
});

router.get('/supplier_products', async (req: Request, res: Response) => {
  try {
      const supplierProducts = await SelectSupplierProducts(req.query.supplier_id);
      res.status(200).json(supplierProducts);
    } catch (error) {
      res.status(500).json({ "error": error }); 
    } 
});

router.get('/:id', async(req: Request, res: Response) => {
  const id = req.params.id
    const check = await checkSupplier(id)
    if(check?.success == false){
     res.status(200).json({delete:false, openOrders:check.openOrders})
    }else{
      res.status(200).json({delete:true, openOrders:null})
    }
   });

router.delete('/:id', async(req: Request, res: Response) => {
  const id = req.params.id
  try{
  await deleteLinkedProducts(id)
  fakeDelete(TABLE_NAME,id)
  res.status(200).send("ok")
  }catch (error) {
    res.status(500).json({ "error": error }); 
  } 
});
router.delete('/supplier_products/:id', async(req: Request, res: Response) => {
  const id = req.params.id
  try{
  deleteRow(SUPPLIER_PRODUCTS,'id', id)
  res.status(200).send("ok")
  }catch (error) {
    res.status(500).json({ "error": error }); 
  } 
});

router.post('/add', async (req: Request, res: Response) => {
    try {
      await insertRow(`${TABLE_NAME}`, req.body);
      res.status(200).send('ok')
    } catch (error) {
      res.status(500).json({ "error": error }); 
    } 
});
router.post('/supplier_products/add', async (req: Request, res: Response) => {
  try {
   const id= await insertAndGetKey(SUPPLIER_PRODUCTS, req.body);
    res.status(201).json(id)
  } catch (error) {
    res.status(500).json({ "error": error }); 
  } 
});

router.put ('/update/:id',async(req: Request, res: Response) => {
    try  {
      const id = req.params.id 
      updateRow(`${TABLE_NAME}`,req.body,'id', id)
      res.status(200).send('ok')
    } catch (error) {
      res.status(500).json({ "error": error }); 
    } 
})

router.put ('/supplier_products/update/:id',async(req: Request, res: Response) => {
  try  {
    const id = req.params.id 
    updateRow(SUPPLIER_PRODUCTS,req.body,'id', id)
    res.status(200).send('ok')
  } catch (error) {
    res.status(500).json({ "error": error }); 
  } 
})
  
module.exports = router;
