const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  isAdmin:{
    type:Boolean,
    default: false
  },
  isDoctor:{
    type:Boolean,
    default: false
  },
  notification:{
    type:Array,
    default:[]
  },
  seennotification:{
    type:Array,
    default: [],
  }
},{
    collection: "users"
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
