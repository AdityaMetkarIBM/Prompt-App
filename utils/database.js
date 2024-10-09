import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);

    console.log("CALLED")

    if(isConnected){
        console.log("Mongo is already connected")
    }

    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: "share_prompt"
        }) 

        isConnected = true;
        console.log("MongoDB is connected successfully");
        return;
    
    }catch(error){
        console.log(error)
    }
}