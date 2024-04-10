import { Request, Response } from 'express';
import db from "../dbObj"

const express = require("express");
const router = express.Router();
const TABLE_NAME = "users"

const getUser = (async (req: Request, res: Response) => {
    try {
      const {userName, password} = req.query
      if(!userName||!password){
        res.status(500).json("לא נשלחו ערכים")
        return
      }
      const result: any = await selectByColumns(TABLE_NAME,"username", "password", userName, password);
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

router.get('/', getUser)

module.exports = router;
