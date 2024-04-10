import { Request, Response } from 'express';
import { Express } from 'express';
import {
    selectAll,
    insertRow,
    updateRow,
    selectByColumn,
    fakeDelete
} from "../baseServer"
import { unlink } from 'node:fs';
import db from '../dbObj';
const express = require("express");
const router = express.Router();
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req: Request, file:File, cb:any) {
      cb(null, 'users_images')
  },

  filename: function (req:Request, multerFile : Express.Multer.File , cb:any) {
    cb(null, `${multerFile.originalname}`)
    console.log(req.body)
  }
})
var upload = multer({storage: storage })

// The next two functions handle validating a current password
//  when the user wants to change to a new password.
const checkPassword = (async (req: Request, res: Response) => {
  try {
    const {userName, password} = req.query
    if(!userName||!password){
      res.status(500).json("לא נשלחו ערכים")
      return
    }
    const result: any = await selectByColumns("users","username", "password", userName, password);
    if (result.length > 0) {
      res.status(200).json({success: true, items: result})
    } else {
      res.json({success: false, items: null});
    }
  } catch (error) {
    res.status(500).json({ "error": error });
  }
});


function selectByColumns(tableName:string, column1:string, column2:string, value1:any, value2:any ) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column1} = ? AND ${column2} = ?`;

    db.query(query, [value1, value2], (error: any, rows: any) => {

      if (error) {
        throw new Error(error.message);
      }
      resolve(rows);
    });
  });
}

router.get('/check', checkPassword)

router.post('/img',  upload.single('file') ,async (req: Request, res: Response) => {
  try {
    res.status(200).send("ok");
  } catch (error) {
    res.status(500).send(`Error: ${error}`);
  }
});

router.post('/delete_img', (req: Request, res: Response) => {
  const file_name = req.body.id   
  unlink(`users_images/${file_name}`, (err) => {
    if (err) throw err;
  }); 
});


var storage = multer.diskStorage({
  destination: function (req: Request, file:File, cb:any) {
      cb(null, 'users_images')
  },

  filename: function (req:Request, multerFile : Express.Multer.File , cb:any) {
    cb(null, `${multerFile.originalname}`)
    console.log(req.body)
  }
})
var upload = multer({storage: storage })
router.post('/img',  upload.single('file') ,async (req: Request, res: Response) => {
  try {
    res.send("ok");
    // console.log(res)
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

router.post('/delete_img', (req: Request, res: Response) => {
  const file_name = req.body.id   
  unlink(`users_images/${file_name}`, (err) => {
    if (err) throw err;
  }); 
});


router.get('/active', async (req:Request, res:Response) => {
  try{
  const users = await selectByColumn("users",'is_active', 1)
  res.json(users).status(200)}
  catch(error){
    res.status(500).send(`Error: ${error}`);
  }
})

router.get('/all', async (req:Request, res:Response) => {
   try
   {const users = await selectAll("users")
    res.json(users).status(200)}
    catch(error){
      res.status(500).send(`Error: ${error}`);
    }
   
})



router.delete('/:id', (req: Request, res: Response) => {
    try{fakeDelete("users",req.params.id)
    res.status(200).send('ok');}
    catch(error){
      res.status(500).send(`Error: ${error}`);
    }
});

router.post('/add', async (req: Request, res: Response) => {
    try {
      await insertRow("users", req.body);
      res.status(200).send('ok');
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  });

 

router.put('/update/:id',(req: Request, res: Response) => {
  try{
    updateRow("users",req.body, 'id', req.params.id)
    res.status(200).send('ok');}
  catch(error){
    res.status(500).send(`Error: ${error}`);
  }  
})



module.exports = router;