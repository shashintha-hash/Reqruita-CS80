const mongoose =require ("mongoose");

const MONGO_URI=process.env.MONGO_URI  || "mongodb://127.0.0.1:27017/reqruita";

async function connectMongo() {
  try{
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(" Failed to connect to MongoDB:", err.message);
    if (err.message.includes('querySrv ECONNREFUSED')) {
      console.error(" [Troubleshooting Tip]: DNS resolution failed. Check your internet or change DNS to 8.8.8.8.");
    }
  }
  }

  module.exports=connectMongo;

