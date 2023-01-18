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

/* USERS */

app.get("/users/", async (req, res) => {
    const users = await userController.getAllUsers()
    console.log(users);
    res.send(JSON.stringify(users));
});

app.post("/users/", async (req, res) => {
    if (req.body.username != undefined && req.body.name != undefined) {
        const newUser = await userController.createUser(req.body.username, req.body.name);
        newUser.save();
        res.send(newUser._id);
    } else {
        res.send("No username or name given!");
    }
});

app.get("/users/:userId", async (req, res) => {
    const user = await userController.getUserById(req.params.userId);

    res.send(JSON.stringify(user));
});

app.delete("/users/:userId", async (req, res) => {
    const deleted = await userController.deleteUserById(req.params.userId);

    res.send(deleted);
});

app.get("/user/:userId/following", async (req, res) => {
    const followingSeries = await userController.getFollowedSeries(req.params.userId);

    res.send(JSON.stringify(followingSeries));
});

app.post("/user/:userId/following", async (req, res) => {
    const user = await userController.followSeries(req.params.userId, req.body.seriesId);

    res.send(JSON.stringify(user.following));
})

/* SERIES */

app.get("/series", async (req, res) => {
    const series = await seriesController.getAllSeries();

    res.send(JSON.stringify(series));
});

app.post("/series", async (req, res) => {
    const series = await seriesController.createSeries(req.body.name);

    res.send(series._id);
});

app.get("/series/:seriesId", async (req, res) => {
    const series = await seriesController.getSeriesById(req.params.seriesId);

    res.send(JSON.stringify(series));
});

app.delete("/series/:seriesId", async (req, res) => {
    const deleted = await seriesController.deleteSeriesById(req.params.seriesId);

    res.send(deleted);
});

app.get("/series/:seriesId/episodes", async (req, res) => {
    const episodes = await seriesController.getAllEpisodesBySeries(req.params.seriesId);

    res.send(JSON.stringify(episodes));
});

app.post("/series/:seriesId/episodes", async (req, res) => {
    let episode;
    if (req.body.date != undefined) {
        episode = await seriesController.addEpisode(req.params.seriesId, req.body.name, req.body.url, reg.body.date);
    } else {
        episode = await seriesController.addEpisode(req.params.seriesId, req.body.name, req.body.url);
    }

    res.send(episode._id);
});



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