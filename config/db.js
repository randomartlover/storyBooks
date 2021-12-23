const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDb Connected`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports= connectDb
