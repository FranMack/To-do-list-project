const Users = require("../models/Users");


class UserServices {
  static async register(data) {
    const { name, email, password } = data;
    try {
      const userExist = await Users.findOne({ where: { email: email } });

      if (userExist) {
        throw new Error("User allready exist");
        return;
      }

      const newUser = await Users.create(data);

      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  static async login(email) {
  
    const user = await Users.findOne({ where: { email: email } });
    

    return user;
  }

  catch(error) {
    console.log(error);
  }

  static async getUserInfo(email){
    try{

      const user= await Users.findOne({where:{email:email}})
      if(!user){
        throw new Error("User not found")
      }
      return user;

    }

    catch(error){
      console.log(error)

    }
  }


  static async editInfo(data){

    const {username,name,lastname,email,password,url_img}=data;
    try{

      const user=await Users.findOne({where:{email:email}})
      if(!user){
        throw new Error("User not found");
      }

    user.username=username
    user.name=name
    user.lastname=lastname
    user.email=email
    user.password=password
    user.url_img=url_img

    return user.save()

    }

    catch(error){

      console.log(error)

    }
  }
}

module.exports = UserServices;
