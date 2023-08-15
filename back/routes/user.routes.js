const express = require("express");
const userRouter = express.Router();
const { generateToken, validateToken } = require("../config/token");
const Users = require("../models/Users");
const Activities = require("../models/Activities");
const {validateAuth}=require("../midlewares/auth")
const UserControllers=require("../controllers/user.controllers")


userRouter.post("/register",UserControllers.register)
userRouter.post("/login",UserControllers.login)
userRouter.get("/info/:email",UserControllers.getUserInfo)
userRouter.put("/info/edit",UserControllers.editInfo)



userRouter.get("/me",validateAuth,(req,res)=>{

  res.send(req.user);
})



userRouter.post("/logout",(req,res)=>{
  const {token}=req.body
  res.clearCookie(token);
  res.sendStatus(204);

})


module.exports = userRouter;
