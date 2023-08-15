const express=require("express");
const activitiesRouter=express.Router();
const ActivitiesControllers=require("../controllers/activities.controllers")

activitiesRouter.post("/create",ActivitiesControllers.createAactivity)
activitiesRouter.get("/all/:username",ActivitiesControllers.getAllActivities)
activitiesRouter.delete("/:username/:id",ActivitiesControllers.deleteActivity)
activitiesRouter.put("/:username/:id",ActivitiesControllers.activityCompleted)

module.exports=activitiesRouter;