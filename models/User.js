import mongoose, { models } from 'mongoose';
const { Schema , model } = mongoose;

const UserSchema = new Schema({
  name: {type: String, required:true},
  email: {type: String, required:true, unique:true},
  password: {type: String, required:true},
  events : {type: Array, default: []},
  admin : {type: Boolean, default: false}
},{timestamps:true});

export default models.User || model("User", UserSchema);