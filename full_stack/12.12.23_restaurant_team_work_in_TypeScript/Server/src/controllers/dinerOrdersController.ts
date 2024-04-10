import express, { Request, Response } from 'express';
import * as baseServer from '../baseServer';
import { Table, injectNames } from '../utils';

const router = express.Router()
const TABLE_NAME = 'diner_orders'

router.get('/all', async (req, res) => {
    try {
        const table = await baseServer.selectAll(TABLE_NAME) as Table;;
        const orders = await injectNames(table, 'users', 'waiter_id', 'first_name', 'waiter_name')
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error receiving all orders' });
    }
});


router.get('/', async (req, res) => {
    try {
        const orderId = Number(req.query.id);

        let orderDetails = await baseServer.selectByColumn(TABLE_NAME, 'id', orderId) as Table;
        if (!orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        orderDetails= await injectNames(orderDetails, 'users', 'waiter_id', 'first_name', 'waiter_name') as Table
        const dishes = await baseServer.selectByColumn('diner_order_dishes', 'order_id', orderId) as any[];

        const result = {
            ...orderDetails[0],
            dishes: dishes,
        };
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

router.get('/active', async (req, res) => {
    try {
        let activeOrders = await baseServer.selectByColumn(TABLE_NAME, 'paid', 0) as Table;
        activeOrders = await injectNames(activeOrders, 'users', 'waiter_id', 'first_name', 'waiter_name')

        res.status(200).json(activeOrders);
    } catch (error) {
        console.error('Error fetching active orders', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/add', async (req, res) => {
    try {
        const order = req.body.order;
        const dishes = req.body.dishes;

        const result = await baseServer.insertRow(TABLE_NAME, order);
        const newDishId = result.insertId;

        if(dishes) {
            dishes.forEach((dish:any) => {
                dish.order_id = newDishId
            });
            await baseServer.insertRows("diner_order_dishes", dishes)
        };
        res.status(200).json({ message: 'Order created successfully', newDishId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error when creating an order' });
    }
});


router.put('/update/:id', async (req, res) => {
    const dishes = req.body.dishes;
    const order = req.body.order;
    const orderId = Number(req.params.id);


    try {
        if (order.table_name === 'Take Away') {
            await baseServer.deleteRow("diner_order_dishes", "order_id", orderId);
        }

        await baseServer.updateRow(TABLE_NAME, order, 'id' ,orderId);
        dishes.forEach(async (dish: any) => {
            dish.order_id = orderId
        });
        
        await baseServer.insertRows("diner_order_dishes", dishes);
        res.status(200).json({ message: 'Order has been successfully updated' });
    } catch (error) {
        console.error("Error updating order:", error);
    }})


router.put('/pay/update/:id', async (req, res) => {
    const orderId = Number(req.params.id);
    const tableId = Number(req.body.table_id)
    try {
        await baseServer.updateRow(TABLE_NAME, { paid: 1 }, 'id', orderId);
        await baseServer.updateRow("tables", { connected_to: null }, "connected_to", tableId)
        res.status(200).json({ message: 'Payment for the order was successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error when paying for the order' });
    }
});


router.delete('/:id', async (req, res) => {
    const orderId = Number(req.params.id);

    try {
        await baseServer.deleteRow(TABLE_NAME, "id", orderId);
        res.status(200).json({ orderId, message: "It's order deleted" });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order' });
    }
});

export default router;


