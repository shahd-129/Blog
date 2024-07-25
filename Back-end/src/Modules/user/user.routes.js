import { Router } from "express";
import { login, signup, validateToken } from "./user.controllers.js";
import { auth } from "./user.meddlewar.js";


const userRouter =  Router()

userRouter.post("/signup" , signup)
userRouter.post("/login" , login)
userRouter.get("/validate", auth(), validateToken);

export default userRouter