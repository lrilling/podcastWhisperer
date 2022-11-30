import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema({
    name: String,
});

const seriesModel = new mongoose.model("Series", seriesSchema);

export default seriesModel;