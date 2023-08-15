const express = require("express");
const router = express.Router();
const userRouter = require("./user.routes");
const activitiesRoutes=require("./activities.routes")

const Users = require("../models/Users");

router.get("/", (req, res) => {
  res.sendStatus(200);
});


router.use("/user", userRouter);
router.use("/activities",activitiesRoutes)



module.exports = router;
