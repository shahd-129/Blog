import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String , require: true },
  email: {
    type: String,
    uniqe: true,
    require: true,
  },
  password: {
    type: String,
    uniqe: true,
  },
  phone: {
    type: String,
    require: true,
    uniqe: true,
  },
});

const User = mongoose.model("user", userSchema);

export default User;

