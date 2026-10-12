const express = require('express');

const FlowerController = require("../controllers/flower");
const FlowerRouter = express.Router();

FlowerRouter.use("/flower", FlowerController.create_flower);
FlowerRouter.use("/flower", FlowerController.get_flowers);
FlowerRouter.use("/flower", FlowerController.update_flower);

module.exports = FlowerRouter;