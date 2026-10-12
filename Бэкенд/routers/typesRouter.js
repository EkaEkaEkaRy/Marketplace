const express = require('express');

const TypeController = require("../controllers/flower_types");
const TypeRouter = express.Router();

TypeRouter.use("/flower-type", TypeController.get_flower_type);
TypeRouter.use("/flower-type", TypeController.create_flower_type);


module.exports = TypeRouter;