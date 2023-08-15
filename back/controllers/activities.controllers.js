const ActivitiesServices = require("../services/activities.services");

class ActivitiesControllers {
  static async createAactivity(req, res) {
    const { username, task } = req.body;

    try {
      const activity = await ActivitiesServices.createAactivity(username,task);

      res.status(200).json(activity);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllActivities(req,res){
    const username=req.params.username
    try{
        const activities=await ActivitiesServices.getAllActivities(username)
        res.status(200).json(activities)

    }
    catch(error){
        console.log(error)

    }
  }

  static async deleteActivity(req,res){
    const idTask=req.params.id
    try{

      const activity=await ActivitiesServices.deleteActivity(idTask)
      res.status(202).json("Deleted")

    }
    catch(error){
      console.log(error)

    }
  }

  static async activityCompleted(req,res){
    const {complete}=req.body;
    const idActivity=req.params.id

    try{
      const activity= await ActivitiesServices.activityCompleted(idActivity,complete)

      res.status(200).json(activity)
    }
    catch(error){
      console.log(error)
    }
  }
}

module.exports = ActivitiesControllers;
