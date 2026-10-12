const express = require('express');

const shcartController = require("../controllers/shoping_cart");
const shcartRouter = express.Router();

shcartRouter.use("/shopping-cart", shcartController.add_into_cart);
shcartRouter.use("/shopping-cart", shcartController.get_cart);
shcartRouter.use("/shopping-cart", shcartController.delete_bunch);
shcartRouter.use("/shopping-cart", shcartController.edit_cart);

module.exports = shcartRouter;