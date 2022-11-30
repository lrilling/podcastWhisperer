import express from "express";
import mongoose from "mongoose";
import { userModel } from "./models/userModel";

const app = express();
const port = 3000;


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
    console.log("Listening on port ", port);
});

async function main() {
    mongoose.connect("mongodb://0.0.0.0:27017/test");
    console.log("connected to mongoDB");
}

main().catch((err) => console.log(err));