const ListServices = require("../services/lists.services");

class ListControllers {
  static async createList(req, res) {
    const { nameList, email } = req.body;

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaa")

    try {

        const list =await ListServices.createList(nameList,email)

        res.status(200).json(list)

    } catch(error) {
        console.log(error)
    }
  }

  static async getList(req,res){

    const email=req.params.email

    

    try{

        const list= await ListServices.getList(email)
        res.status(200).json(list)

    }

    catch(error){
        console.log(error)

    }
  }

  static async deleteList(req,res){

    const listId= req.params.listId;

    try{
      const list= await ListServices.deleteList(listId)

      res.status(202).json("List deleted")
    }

    catch(error){

      console.log(error)
    }

  }

  static async editListName(req,res){
    const {listId,nameList}=req.body;

    console.log("listID",listId)
    try{

      const list= await ListServices.editListName(listId,nameList)

      res.send(200).json(list)

    }

    catch(error){

      console.log(error)

    }
  }


}

module.exports=ListControllers;
