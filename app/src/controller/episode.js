import episodeModel from "../models/episodeModel"


class Episode {
    constructor() {

    }

    async createEpisode(name, series, number, url, date = new Date()) {
        const newEpisode = new episodeModel({ name: name, series: seriesID, url: url, date: date, number: series.numOfEpisodes + 1 });
        newEpisode.save();

        return newEpisode;
    }

    async getEpisodeByName(name) {
        const episode = await episodeModel.findOne({ name: name }).exec();

        return episode;
    }

    async getEpisodeById(id) {
        const episode = await episodeModel.findOne({ _id: id }).exec();

        return episode;
    }

}

export default Episode
