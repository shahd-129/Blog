import User from "../../../DB/Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError, catchAysncErrorr } from "../../utils/ErrorHandling.js";
export const signup = catchAysncErrorr(async (req, res) => {
  const { email, password, phone, name } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) throw new AppError("email already exist" , 400 );

  const hashPass = bcrypt.hashSync(password, 10);

  const sign = await User.create({
    email,
    password: hashPass,
    phone,
    name,
  });
  res.json({ message: "created success", sign });
});

export const login = catchAysncErrorr(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "Email not found, please signup" });
  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Invalid password" });
  }

  jwt.sign(
    { userId: user._id, name: user.userName },
    "secret_token",
    (error, token) => {
      res.json({ message: "Login Successfully", token });
    }
  );
});

export const validateToken = (req, res) => {
  res.json({ valid: true });
};


