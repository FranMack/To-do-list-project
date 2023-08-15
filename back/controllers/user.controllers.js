const UserServices = require("../services/user.services");
const { generateToken, validateToken } = require("../config/token");
const { body, validationResult } = require("express-validator");
const Users = require("../models/Users");
const { Op } = require("sequelize");

class UserControllers {
  static async register(req, res) {
    const data = req.body;
    const { name, email, password,username } = data;
    try {
      await body("name")
        .notEmpty()
        .withMessage("firstname is required")
        .isLength({ min: 1 })
        .withMessage("firstname minimum 1 character")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("firstname can only contain letters and spaces")
        .run(req);

      await body("lastname")
        .notEmpty()
        .withMessage("firstname is required")
        .isLength({ min: 1 })
        .withMessage("lastname minimum 1 character")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("lastname can only contain letters and spaces")
        .run(req);

      await body("username")
        .notEmpty()
        .withMessage("username is required")
        .isLength({ min: 1 })
        .withMessage("username minimum 1 character")
        .run(req);

      await body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email")
        .run(req);

      await body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password minimum 8 character")
        .matches(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage("password must contain at least one special character")
        .matches(/\d/)
        .withMessage("password must contain at least one number")
        .matches(/[a-z]/)
        .withMessage("password must contain at least one lowercase letter")
        .matches(/[A-Z]/)
        .withMessage("password must contain at least one capital letter")
        .run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("errores", errors);
        return res.status(400).json({ errors: errors.array() });
      }

      console.log("errors", errors);

      const existingUser= await Users.findOne({where:{[Op.or]:[{email:email},{username:username}]}})
      if(existingUser){
       
        return res.status(400).json({errors:"User allredy exist"})
      }





      const newUser = await UserServices.register(data);
      res.sendStatus(200).json(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserServices.login(email);
      const validated = user.validatePassword(password);

      if (!validated) {
        throw new Error("Wrong credentials");
        return;
      }

      const payload = {
        name: user.name,
        email: user.email,
        username: user.username,
        id: user.id,
      };

      const token = generateToken(payload);

      res.cookie("token", token);

      res.json({ payload });
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserInfo(req, res) {
    const email = req.params.email;
    try {
      const user = await UserServices.getUserInfo(email);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async editInfo(req, res) {
    const data = req.body;
    const { username, name, lastname, email, password, url_img } = data;

    try {

      await body("name")
        .notEmpty()
        .withMessage("firstname is required")
        .isLength({ min: 1 })
        .withMessage("firstname minimum 1 character")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("firstname can only contain letters and spaces")
        .run(req);

      await body("lastname")
        .notEmpty()
        .withMessage("firstname is required")
        .isLength({ min: 1 })
        .withMessage("lastname minimum 1 character")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("lastname can only contain letters and spaces")
        .run(req);

      await body("username")
        .notEmpty()
        .withMessage("username is required")
        .isLength({ min: 1 })
        .withMessage("username minimum 1 character")
        .run(req);

      await body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email")
        .run(req);

      await body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password minimum 8 character")
        .matches(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage("password must contain at least one special character")
        .matches(/\d/)
        .withMessage("password must contain at least one number")
        .matches(/[a-z]/)
        .withMessage("password must contain at least one lowercase letter")
        .matches(/[A-Z]/)
        .withMessage("password must contain at least one capital letter")
        .run(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("errores", errors);
        return res.status(400).json({ errors: errors.array() });
      }

      console.log("errors", errors);

      
      const user = await UserServices.editInfo(data);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserControllers;
