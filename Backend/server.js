import express from 'express'
import products from './data/products.js';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRouter from './router/productRoutes.js'


dotenv.config()
const PORT = 3000;

const app = express();
app.use(cors());

app.use('/api/products',productRouter)





connectDB()
app.listen(PORT,()=> console.log(`listening on ${PORT}`))