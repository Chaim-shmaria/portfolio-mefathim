import express, { Request, Response } from 'express';
import * as baseServer from '../baseServer';


const router = express.Router()

router.get('/all', async (req, res) => {
    try {
        const orders = await baseServer.selectAll("dishes_categories");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error receiving all orders' });
    }
});

export default router;
