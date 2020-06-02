const Sequelize = require('sequelize');
const pgtools = require('pgtools');
require('dotenv').config();
const userModel = require('../db/model/user.js');
const cabModel = require('../db/model/cab.js');

// exports.db_con = function() {
const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
  host: process.env.PG_HOST
}

pgtools.createdb(config, process.env.PG_DB);

const sequelize = new Sequelize(process.env.PG_DB, process.env.PG_USER, process.env.PG_PASS, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  dialect: 'postgres',
  ssl: process.env.SSL
});

var User = userModel(sequelize, Sequelize);
var Cab = cabModel(sequelize, Sequelize);


User.belongsToMany(Cab, {
  as: 'cabData',
  through: 'UserCabDetails'
});


module.exports = {
  User,
  Cab

};

sequelize.sync();
