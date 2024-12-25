import mongoose from 'mongoose';


const connectDB = async (MONGO_URI,DB_NAME)=>{
    try{
        console.log("uri ---> ",MONGO_URI)    
        const mongoConnect = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
        console.log("Mongo DB Connected Succefully",MONGO_URI,mongoConnect.connection.port)
    
    }
    catch(err){ 
        console.log("DATABASE CONNECTION ERROR ",err);

    }
}

export default connectDB;