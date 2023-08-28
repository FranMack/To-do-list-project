const Sequelize=require("sequelize");

const db=  new Sequelize('tmdb', "postgres", null, {
    host: 'localhost',
    dialect: 'postgres',
    logging:false
  });

  module.exports=db;