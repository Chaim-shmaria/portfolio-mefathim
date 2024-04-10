import express, { Request, Response } from 'express';
const router=express.Router();
import {selectAll,selectByColumn,insertRow,updateRow, fakeDelete, SelectInventory} from '../baseServer'
const tableName='inventory'

router.get('/all', async (req:Request, res: Response) => {
  try{
    const inventory = await SelectInventory(false)
    res.status(200).json(inventory)
  }
  catch(error){
    res.status(500).send(error)
  }
    
  });

  router.get('/reference_tables/all', async (req:Request, res: Response) => {
    try{
      const categories = await selectAll('inventory_category')
      const size_types =await selectAll('size_types')
      res.status(200).json([categories,size_types])
    }
    catch(error){
      res.status(500).send(error)
    }
      
    });

router.get('/active',async (req:Request, res: Response) =>{
  try{
    const inventoryActive = await SelectInventory(true)
    res.status(200).json(inventoryActive)
  }
  catch(error){
    res.status(500).send(error)
  }
    
})

router.post('/add', async(req: Request, res: Response) =>{
  try{
    await insertRow(tableName, req.body);
    res.status(200).send('added succeed')
  }
  catch(error){
    res.status(500).send(error)
  }
});

router.put('/update/:id',(req: Request, res: Response) => {
  try{
    updateRow(tableName,req.body, 'id',req.params.id)
    res.status(200).send("ok")
  }
  catch(error){
    res.status(500).send(error)
  }
    
}) 
  
router.delete('/:id', async(req: Request, res: Response) => {
  let productsConnected:any=await selectByColumn('products','inventory_id',req.params.id)
  if (productsConnected.length>0){
    res.status(200).json(productsConnected);
  }
else{

  try{
     fakeDelete(tableName,req.params.id)
      res.status(200).send('ok');
    }
    catch(error){
      res.status(500).send(error)
    }
}



    
});

module.exports=router
