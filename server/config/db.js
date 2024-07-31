
import mongoose from "mongoose";
import env from 'dotenv'
env.config()

const connectWithdbUrl = async() => {
  try
    {
        await mongoose.connect(process.env.dbUrl);

        const connection = mongoose.connection;
        connection.on('connected',()=>
        {
            console.log('MongoDB connection is established');
        })

        connection.on('error',(error)=>
        {
            console.log('Error in mongoDB', error);
        })
    }
    catch(error){
         console.log('Something went wrong', error)
    }
    
};

export default connectWithdbUrl ;