const express = require('express');

const orderController = require("../controllers/order");
const orderRouter = express.Router();

orderRouter.use("/order", orderController.create_order);
orderRouter.use("/order", orderController.get_orders);
orderRouter.use("/order", orderController.update_status)

module.exports = orderRouter;