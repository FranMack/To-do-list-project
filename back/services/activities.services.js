const Users = require("../models/Users");
const Activities = require("../models/Activities");
const Lists=require("../models/Lists")

class ActivitiesServices {
  static async createAactivity(listId,task) {
    try {
     
      const list=await Lists.findByPk(listId);
      if(!list){
        throw new Error("List not found");
        return;

      }

      const activity = await Activities.create({ task: task });
      activity.setList(list.id);
      return activity;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllActivities(listId) {
    try {
      const list=await Lists.findByPk(listId);
      if (!list) {
        throw new Error("List not found");
        return;
      }

      const activities = await Activities.findAll({
        where: { listId: list.id },
      });
      return activities;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteActivity(idTask) {
    try {
      const activity = Activities.destroy({ where: { id: idTask } });
      return activity;
    } catch (error) {
      console.log(error);
    }
  }

  static async activityCompleted(idActivity, complete) {
    try {
      const activity = await Activities.findByPk(idActivity);
      activity.complete = complete;

      return activity.save();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ActivitiesServices;
