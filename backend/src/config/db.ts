import mongoose from "mongoose";
import "dotenv/config";
// import axios from "axios";

// const autoIPAdding = async () => {

//   const auth = {
//     username:<string> process.env.PUBLIC_KEY,
//     password:<string> process.env.PRIVATE_KEY
//   }

//   const ipRes = await axios.get("https://ifconfig.me");
//   const ip = ipRes.data
//   console.log("MOJE IP:", ip)
//   console.log("MOJE CREDKI", auth)

//   const url = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${process.env.PROJECT_ID}/accessList`;

//    const payload = [{
//     cidrBlock: ip,
//     comment: `Automatically added ip adress`
//   }];

//   const response = await axios.post(url, payload, { auth });
//   // console.log("RESPONSE", response)
// }

const connectDB = async () => {
  try {
    // autoIPAdding();
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
