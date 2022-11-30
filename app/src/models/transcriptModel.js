import mongoose from "mongoose";

const transcriptSchema = new mongoose.Schema({
    episode: { type: mongoose.Schema.Types.ObjectId, ref: "Episode" },
    versions: Array // versions are JSON objects containing the transcript text and a date
});

const transcriptModel = new mongoose.model("Transcript", transcriptSchema);

export default transcriptModel;