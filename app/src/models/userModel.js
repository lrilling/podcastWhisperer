import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Episode" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Series" }]
}, {
    methods: {
        saveEpisode(episodeID) {
            this.episodes.add(episodeID);
        },

        removeEpisode(episodeID) {
            this.episodes.remove(episodeID);
        },

        followSeries(seriesID) {
            this.following.add(seriesID);
        },

        unfollowSeries(seriesID) {
            this.following.remove(seriesID);
        }
    }
});

const userModel = new mongoose.model("User", userSchema);

export default userModel;