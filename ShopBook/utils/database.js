const mongodb = require("mongodb");

const config =  require('../config.js');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${config.DBUSER}:${config.DBPASS}@cluster0.ssc1tcl.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("connected");
      _db = client.db(config.DATABASE);
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db){
    return _db;
  }
  throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
// module.exports = mongoConnect;

/* --- SEQUELIZE ---
const Sequelize = require("sequelize");

const sequelize = new Sequelize("tutorials", "root", "212319972006", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
*/
