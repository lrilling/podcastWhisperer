class PodcastList {
    constructor() {
        this.episodes = [];
    }

    addPodcast(podcastId) {
        this.episodes.push(podcastId);
    }

    removePodcast(podcastId) {
        const index = this.episodes.indexOf(podcastId);

        if (index > -1) {
            this.episodes.splice(this.episodes.indexOf(podcastId))
        } else {
            console.log("Tried to remove podcast that is not in the list!");
        }
    }
}