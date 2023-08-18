const db= require("../config/db");
const sequelize=require("sequelize");

class List extends sequelize.Model{}

List.init(
    {
    nameList:{type:sequelize.STRING}

    },{sequelize:db,modelName:"list"}
)

module.exports=List;