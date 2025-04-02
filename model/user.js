const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: String,
  email: { type: String, unique: true },
  picture: String,
},{
    timestamps:true,
    versionKey:false
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
