const Users = require("../models/Users");
const Activities = require("../models/Activities");

class ActivitiesServices {
  static async createAactivity(username, task) {
    try {
      const user = await Users.findOne({ where: { username: username } });
      if (!user) {
        throw new Error("User not found");
        return;
      }
      const activity = await Activities.create({ task: task });
      activity.setAuthor(user.id);
      return activity;
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllActivities(username) {
    try {
      const user = await Users.findOne({ where: { username: username } });
      if (!user) {
        throw new Error("User not found");
        return;
      }

      const activities = await Activities.findAll({
        where: { authorId: user.id },
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
