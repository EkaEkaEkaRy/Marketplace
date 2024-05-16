const express = require('express');

const reservController = require("../controllers/reservation");
const reservRouter = express.Router();

reservRouter.use("/reservation", reservController.add_reserv);
reservRouter.use("/reservation", reservController.find_reserv);
reservRouter.use("/count", reservController.find_max_count_table);
reservRouter.use("/count", reservController.find_max_count_room);

module.exports = reservRouter;