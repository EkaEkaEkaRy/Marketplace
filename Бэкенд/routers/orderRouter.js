const express = require('express');

const orderController = require("../controllers/order");
const orderRouter = express.Router();

orderRouter.use("/order", orderController.create_order);

module.exports = orderRouter;