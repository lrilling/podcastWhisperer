const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

async function getUri() {
    const mongod = await MongoMemoryServer.create();

    const uri = mongod.getUri();
    return uri;
}

async function connect() {
    const uri = await getUri();
    console.log(uri);
    mongoose.connect(uri).then(() => {
        console.log("connected to mockgoose");
    })
}

async function clearDB() {
    console.log("clearing DB");
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany();
    }
}

async function disconnect() {
    console.log("disconnecting...");
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log("disconnected");
}

exports.connect = async function () {
    await connect();
    await clearDB();
}

exports.disconnect = async function () {
    await clearDB();
    await disconnect();
}
