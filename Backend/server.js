import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRouter from './router/productRoutes.js'
import userRouter from './router/userRoutes.js'
import orderRouter from './router/ordersRoute.js'
import cookieparser from 'cookie-parser';
dotenv.config()
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())


app.use('/api/products',productRouter)
app.use('/api/users',userRouter)
app.use("/api/order", orderRouter);



connectDB()
app.listen(PORT,()=> console.log(`listening on ${PORT}`))