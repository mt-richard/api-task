const fs = require('fs');
require('dotenv').config();

module.exports =  {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DRIVER,
  }
 
}
// 
 // "development": {
  //   "username": "root",
  //   "password": null,
  //   "database": "db",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql"
  // }