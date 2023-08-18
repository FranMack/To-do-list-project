const Users=require("./Users");
const Avtivities=require("./Activities");
const Lists= require("./Lists")



Avtivities.belongsTo(Lists,{as:"list"})

Lists.belongsTo(Users,{as:"author"})




module.exports={Users,Avtivities}