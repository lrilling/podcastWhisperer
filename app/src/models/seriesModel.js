import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
    name: String,
    numOfEpisodes: Number,
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const seriesModel = new mongoose.model("Series", seriesSchema);

export default seriesModel;