const express = require('express');

const bunchController = require("../controllers/bunch.js");
const onebunchController = require("../controllers/one_bunch.js")
const bunchRouter = express.Router();

bunchRouter.use("/one-bunch", onebunchController.get_one_bunch);
bunchRouter.use("/bunch", bunchController.get_bunchs);
bunchRouter.use("/bunch", bunchController.create_bunch);
bunchRouter.use("/bunch", bunchController.update_bunch);
bunchRouter.use("/bunch", bunchController.delete_bunch);

module.exports = bunchRouter;