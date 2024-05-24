const express = require('express');

const userController = require("../controllers/user.js");
const profileController = require("../controllers/profile.js")
const userRouter = express.Router();

userRouter.use("/create-user", userController.create_user);
userRouter.use("/find-user", userController.find_user);
userRouter.use("/info-user", profileController.info_user);
userRouter.use("/info-user", profileController.update_profile);


module.exports = userRouter;