import { configDotenv } from 'dotenv';
configDotenv({
    path: '.env'
})
import express from 'express';
import router from './src/routes/route.js';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'docappoint';
import connectDB from './src/database/connection.js';
connectDB(MONGO_URI,DB_NAME);

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.status(200).json({msg:"Backend of DocAppoint"})
});
app.use("/api",router)
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})
