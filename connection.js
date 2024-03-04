const mongoose = require("mongoose");

async function connectMongoDb() {
  return mongoose
    .connect("mongodb://localhost:27017/Short_Url")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));
}
module.exports = { connectMongoDb };
