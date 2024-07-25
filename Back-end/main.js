import express from 'express'
import cors from 'cors';
import './DB/connection.js'
import userRouter from './src/Modules/user/user.routes.js'
import { AppError } from './src/utils/ErrorHandling.js'
const app = express()
const port = 3000
app.use(express.json())



const corsOptions = {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  app.use(cors(corsOptions));
  
  
  

app.use("/user" , userRouter)





app.use("*" , (req , res , next) =>{
    next(new AppError(req.originalUrl + "not found" , 404))
})


app.use((err , req , res , next) =>{
    const {message , statusCode} = err
    res.status(statusCode || 500).json({message})
}
)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))