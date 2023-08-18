const List = require("../models/Lists");
const Lists=require("../models/Lists");
const Activities=require("../models/Activities")
const Users=require("../models/Users")


class ListServices {

    static async createList(nameList,email){

        try{

            const user= await Users.findOne({where:{email:email}})
            if (!user) {
                throw new Error("User not found");
                return;
              }

            const list= await Lists.create({nameList:nameList});
            list.setAuthor(user.id);
            return list;


        }

        catch(error){

            console.log(error)

        }
    }


    static async getList(email){
        try{

            const user= await Users.findOne({where:{email:email}});
            
            if(!user){
                throw new Error("User not found");
                return;
            }

            const list=await Lists.findAll({where:{authorId:user.id}})

            return list;


        }

        catch(error){console.log(error)

        }
    }


    static async deleteList(listId){
        try{

            const activities= await Activities.destroy({where:{listId:listId}})

            const list= await Lists.destroy({where:{id:listId}})

            return list;

        }

        catch(error){

            console.log(error)

        }
    }


    static async editListName(listId,nameList){

        try{

            const list= await Lists.findByPk(listId)

            list.nameList=nameList;

            return list.save()

        }

        catch(error){
            console.log(error)

        }
    }



}

module.exports=ListServices;