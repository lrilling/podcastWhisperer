const mongoose = require("mongoose");

exports.connect = async function () {
    const uri = "mongodb://localhost:27017/test";
    await mongoose.connect(uri);
    console.log("connected to ", uri);
}

exports.disconnect = async function () {
    console.log("disconnecting...");
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log("disconnected");

}

exports.clearDB = async function () {
    console.log("clearing DB");
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany();
    }
}
