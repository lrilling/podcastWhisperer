import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { async, userController } from "../dist/controller/user";
import { seriesController } from "../dist/controller/series";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoUri;
if (process.env.NODE_ENV == "testing") {
    // when testing using ../test/rest.test.mjs
    const mongod = MongoMemoryServer.create();
    mongoUri = mongod.getUri();
} else if (process.env.NODE_ENV == "container") {
    // when running in a container
    mongoUri = "mongodb://db:27017/test";
} else {
    // when running locally - make sure to have a mongoDB running!
    mongoUri = "mongodb://localhost:27017/test"
}

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log("root accessed");
    res.send(JSON.stringify({}));
});

app.get("/users/", async (req, res) => {
    const users = await userModel.find({}).exec();
    console.log(users);
    res.send(JSON.stringify(users));
});

app.get("/users/:userId", async (req, res) => {
    const user = await userModel.find({ _id: req.params.userId });
    console.log(user);
    res.send(JSON.stringify(user));
});

app.post("/users/", (req, res) => {
    const newUser = new userModel({ username: "TestUser1", name: "Max Mustermann" });
    newUser.save();
    res.send(newUser._id);
})

app.listen(port, () => {



const exportApp = app.listen(port, () => {
    console.log("Listening on port ", port);
});

async function main() {
    await mongoose.connect(mongoUri);
    console.log("connected to mongoDB");
}

if (process.env.NODE_ENV != "testing") {
    main().catch((err) => console.log(err));
}


export default exportApp; // for testing