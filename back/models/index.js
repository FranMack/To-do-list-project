const Users=require("./Users");
const Avtivities=require("./Activities");

Avtivities.belongsTo(Users,{as:"author"})



module.exports={Users,Avtivities}