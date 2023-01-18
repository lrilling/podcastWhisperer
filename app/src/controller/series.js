import seriesModel from "../models/seriesModel";
import episodeModel from "../models/episodeModel";
import { episodeController } from "../controller/episode";
import { userController } from "../controller/user";

class SeriesContoller {
    constructor() {
    }

    async createSeries(name) {
        const newSeries = new seriesModel({ name: name, episodes: [], numOfEpisodes: 0 });

        await newSeries.save();

        return newSeries
    }

    async getSeriesByName(name) {
        const series = await seriesModel.findOne({ name: name }).exec();

        return series;
    }

    async getSeriesById(id) {
        const series = await seriesModel.findOne({ _id: id }).exec();

        return series;
    }

    async addEpisode(seriesID, name, url, date = new Date()) {

        const series = await seriesModel.findOne({ _id: seriesID }).exec();

        if (series.length < 1) {
            throw new Error("Series with given ID does not exist!");
        }

        const newEpisode = episodeController.createEpisode(name, seriesID, series.numOfEpisodes + 1, url, date);

        series.numOfEpisodes += 1;

        series.episodes.push(newEpisode._id);

        series.save();

        // Make sure that the new episode is sent to all the user who follow the show:
        series.followers.forEach(follower => {
            series.episodes.forEach(episode => {
                userController.saveEpisode(follower._id, episode._id);
            });
        });

        return newEpisode;
    }

    async getAllEpisodesBySeries(seriesId) {
        const series = this.getSeriesById(seriesId)

        const episodes = series.episodes;

        return episodes;
    }

    async addFollower(seriesId, userId) {
        const series = this.getSeriesById(seriesId);

        series.following.push(userId);

        series.save();

        return series;
    }

    async getAllSeries() {
        const series = await seriesModel.findAll().exec();

        return series;
    }
}

const seriesController = new SeriesContoller();
exports.seriesController = seriesController;