const mongoose = require("mongoose");

const dbconnect = async () => {
  try {
    const responce = await mongoose.connect(process.env.MONGODB_URL);
    console.log(responce.connection.host);
  } catch (error) {
    console.log("mongodb connection failed", error);
  }
};

module.exports = dbconnect;
