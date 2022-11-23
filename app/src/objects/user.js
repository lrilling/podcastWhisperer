class User {
    constructor(id, username, name, episodes = [], following = [], lists = []) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.episodes = episodes;
        this.following = following;
        this.lists = lists;
    }

    saveEpisode(episodeID) {
        this.episodes.add(episodeID);
    }

    removeEpisode(episodeID) {
        this.episodes.remove(episodeID);
    }

    followSeries(seriesID) {
        this.following.add(seriesID);
    }

    unfollowSeries(seriesID) {
        this.following.remove(seriesID);
    }
}

export default User