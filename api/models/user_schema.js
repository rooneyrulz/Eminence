const mongoose = require("mongoose");
const validator = require("validator");

//Create User Schema
let userSchema = mongoose.Schema({
   _id: {
      type: mongoose.Schema.Types.ObjectId
   },

   name: {
      type: String,
      required: [true, 'name is required!!'],
      lowercase: true
   },

   email: {
      type: String,
      required: [true, 'email is required!!'],
      lowercase: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      validate: (value) => {
         return validator.isEmail(value);
      }
   },

   username: {
      type: String,
      required: [true, 'username is required!!'],
      lowercase: true,
      unique: true
   },

   country: {
      type: String,
      required: [true, 'country is required!!'],
      lowercase: true
   },

   password: {
      type: String,
      required: [true, 'password is required!!'],
   }
});

module.exports = mongoose.model('E_Users', userSchema);