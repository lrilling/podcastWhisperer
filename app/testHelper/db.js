const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

async function getUri() {
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();
    return uri;
}

exports.connect = async function () {
    const uri = await getUri();
    console.log(uri);
    mongoose.connect(uri).then(() => {
        console.log("connected to mockgoose");
    })
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
