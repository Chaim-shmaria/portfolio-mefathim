import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import tableController from "./controllers/tableController";
import WorkDayController from "./controllers/workDayController";
import dinerOrdersController from './controllers/dinerOrdersController';
import menuController  from './controllers/menuController';
import dinerOrdersDishesController from './controllers/dinerOrdersDishesController'
import dishesCategoriesController  from './controllers/dishesCategoriesController';

const inventory=require('./controllers/inventoryController')
const supplierOrder = require("./controllers/supplierOrderController");
const suppliers = require("./controllers/suppliersController");
const login = require("./controllers/loginController");
const products = require("./controllers/productController");
const users = require('./controllers/usersController')
const sendEmail = require("./controllers/sendEmailController")

const app = express();
const port = process.env.PORT || 8888;


app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var path = require('path');
app.use('/users/img', express.static(path.join('users_images')))
app.use("/tables", tableController);
app.use("/work_day", WorkDayController);
app.use('/diners_orders', dinerOrdersController);
app.use('/dishes', menuController);
app.use('/diners_orders_dishes', dinerOrdersDishesController);
app.use('/users', users)
app.use('/inventory',inventory)
app.use("/supplierOrder", supplierOrder);
app.use("/suppliers", suppliers);
app.use("/login", login);
app.use("/products", products);
app.use("/sendEmail", sendEmail)
app.use("/dishes_categories",dishesCategoriesController)
app.use('/users/img', express.static(path.join('users_images')));


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
