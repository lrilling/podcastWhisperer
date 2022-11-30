import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    name: String,
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }]
}, {
    methods: {
        addEpisode(episodeID) {
            this.episodes.add(episodeID);
        },
        removeEpisode(episodeID) {
            this.episodes.remove(episodeID);
        }
    }
});

const listModel = new mongoose.model("List", listSchema);

export default listModel;