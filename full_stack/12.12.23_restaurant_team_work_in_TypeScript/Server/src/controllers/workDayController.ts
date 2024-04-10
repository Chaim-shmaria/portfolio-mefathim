import { Router, Request, Response } from "express";
import { selectByColumn } from "../baseServer";

const router = Router();
const verifyWorkDayEnd = async (req: Request, res: Response) => {
  try {
    const {password} = req.body;

    const user: any = await selectByColumn("users", "password", password)
    if (user[0]) {
      const passwordMatch = user[0].role === "מנהל";

      if (!passwordMatch) {
        return res.status(245).send('245');
      }
      const dbDinersOrder: any = await selectByColumn("diner_orders", "paid ", "0")
      const activeOrder = dbDinersOrder.length > 0;

      if (activeOrder) {
        return res.status(250).send('250');
      }

      res.status(200).send('200');
    }
    res.status(251).send("251")
  }
  catch (error) {
    console.error(error);
    res.status(500).send('500');
  }

};

router.post('/add', verifyWorkDayEnd);

export default router
