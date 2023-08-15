const Sequelize=require("sequelize");

const db=  new Sequelize('to_do_list', "postgres", null, {
    host: 'localhost',
    dialect: 'postgres',
    logging:false
  });

  module.exports=db;