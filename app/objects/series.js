class Series {
    constructor(id, name, episodes) {
        this.id = id;
        this.name = name;
        this.episodes = episodes;
    }

    addEpisode(episode) {
        this.episodes.add(episode);
    }
}