const express = require('express');

const userController = require("../controllers/user.js");
const userRouter = express.Router();

userRouter.use("/create-user", userController.create_user);
userRouter.use("/find-user", userController.find_user);


module.exports = userRouter;