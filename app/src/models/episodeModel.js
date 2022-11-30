import mongoose, { mongo } from "mongoose";

const episodeSchema = new mongoose.Schema({
    name: String,
    series: { type: mongoose.Schema.Types.ObjectId, ref: "Series" },
    number: Number,
    date: Date,
    filePath: String
});

const episodeModel = new mongoose.model("Episode", episodeSchema);

export default episodeModel;