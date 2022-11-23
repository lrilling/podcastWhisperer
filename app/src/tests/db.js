import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";


async function connect() {
    const uri = "mongodb://localhost:27017/test";
    await mongoose.connect(uri);
}

async function disconnect() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
}

async function clearDB() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany();
    }
}

export { connect, disconnect, clearDB };