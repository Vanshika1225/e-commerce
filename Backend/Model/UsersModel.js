const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    unique: true, 
    required: true 
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    match: /^[A-Z][a-z]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(v);
      },
      message: "Invalid email format",
    },
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 8 
  },
  address: { 
    type: String, 
    required: true, 
    minlength: 10, 
    maxlength: 100 
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user",
  },
});

const usersModel = mongoose.model("User", usersSchema);
module.exports = usersModel;
