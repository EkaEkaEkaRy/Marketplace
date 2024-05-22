const express = require('express');

const bunchController = require("../controllers/bunch.js");
const bunchRouter = express.Router();

bunchRouter.use("/one-bunch", bunchController.get_one_bunch);
bunchRouter.use("/bunch", bunchController.get_bunchs);
bunchRouter.use("/bunch", bunchController.create_bunch);
bunchRouter.use("/bunch", bunchController.update_bunch);
bunchRouter.use("/bunch", bunchController.delete_bunch);

module.exports = bunchRouter;