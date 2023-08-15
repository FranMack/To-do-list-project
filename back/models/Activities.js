const Sequelize = require("sequelize");
const db = require("../config/db");

class Avtivities extends Sequelize.Model {}

Avtivities.init(
  {
    task: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    complete: {
      type: Sequelize.BOOLEAN,
      defaultValue:false
    },
  },
  { sequelize: db, modelName: "activities" }
);

module.exports = Avtivities;
