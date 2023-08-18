const express=require("express");
const listRouter=express.Router();

const ListControllers=require("../controllers/lists.controllers");

listRouter.post("/create",ListControllers.createList)
listRouter.get("/all/:email",ListControllers.getList)
listRouter.delete("/:listId",ListControllers.deleteList)
listRouter.put("/edit-list-name",ListControllers.editListName)


module.exports=listRouter;