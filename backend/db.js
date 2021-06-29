// const mongoose = require('mongoose');

// const connectToDatabase = async()=>{
//      let connection = await mongoose.connect("mongodb://localhost:27017/ctsdb", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true
//       });
//       console.log(`Connected to the database host`);
// }

// module.exports = connectToDatabase;


// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(`Mongo connected:${conn.connection.host}`.rainbow)
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    process.exit(1);
  }
};
// export default connectDB
module.exports=connectDB