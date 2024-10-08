const Sequelize = require('sequelize');

const database = process.env.database;
const username = process.env.username;
const password = process.env.password;
const host = process.env.host;

const sequelize = new Sequelize(database,username,password,{
    host:host,
    dialect:'mysql'
})

module.exports = sequelize