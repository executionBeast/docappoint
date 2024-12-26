import { configDotenv } from 'dotenv';
configDotenv({
    path: '.env'
})
//express
import express from 'express';
import router from './src/routes/route.js';
const app = express();
const PORT = process.env.PORT || 3000;

//notification
import sendNotification from './src/utils/sendNotification.js';
// sendNotification("Hello from docappoint", "+917052070747");

//db connection
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'docappoint';
import connectDB from './src/database/connection.js';
connectDB(MONGO_URI,DB_NAME);

//json parser
app.use(express.json());
//express body parser
app.use(express.urlencoded({extended:true}));

//default / route
app.get("/",(req,res)=>{
    res.status(200).json({msg:"Backend of DocAppoint"})
});
app.use("/api",router)
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})
