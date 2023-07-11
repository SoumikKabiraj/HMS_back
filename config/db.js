// const mongoose = require('mongoose')
// const colors = require('colors')

// const connectDB =()=>{
//         mongoose.set('strictQuery',true);
//         mongoose.connect('mongodb://127.0.0.1:27017/HospitalManagement_2');
//         var db=mongoose.connection;
//         db.on('error',()=>{console.log("Error Occured while connecting to database".bgRed.white)});
//         db.once('open',()=>{console.log(`connected to database ${mongoose.connection.host}`.bgGreen.white)})
//     }

// module.exports = connectDB;

const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
