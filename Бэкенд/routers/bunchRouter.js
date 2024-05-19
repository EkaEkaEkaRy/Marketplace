const express = require('express');

const bunchController = require("../controllers/bunch.js");
const bunchRouter = express.Router();

bunchRouter.use("/flower-type", bunchController.get_flower_type);
bunchRouter.use("/flower-type", bunchController.create_flower_type);

module.exports = bunchRouter;