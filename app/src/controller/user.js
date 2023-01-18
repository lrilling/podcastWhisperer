import { seriesController } from "../controller/series";
import seriesModel from "../models/seriesModel";
import userModel from "../models/userModel"

class UserController {
    constructor() {
    }

    async createUser(username, name) {
        const existingUser = await userModel.find({ username: username }).exec();
        if (existingUser.length > 0) {
            throw new Error(`User with username ${username} already exists!`);
        }

        console.log("Creating new User...");
        const newUser = new userModel({ username: username, name: name });
        await newUser.save();

        return newUser;
    }

    async getUserByName(username) {
        const [user] = await userModel.find({ username: username }).exec();

        if (!user) {
            console.log("User not found!");
        }
        return user;
    }

    async getUserById(id) {
        const [user] = await userModel.find({ _id: id }).exec();

        if (!user) {
            console.log("User not found!");
        }
        return user;
    }

    async deleteUserById(id) {
        await userModel.deleteOne({ _id: id });

        return true;
    }

    async getAllUsers() {
        const users = await userModel.find({}).exec();

        if (!users) {
            console.log("getting all users failed!");
        } else if (users.length < 1) {
            console.log("no users in DB");
        }
        return users;
    }

    async followSeries(userId, seriesId) {
        const user = await userModel.findOne({ _id: userId }).exec();

        user.following.push(seriesId);

        const series = seriesController.addFollower(seriesId, userId);

        const episodesOfSeries = series["episodes"];

        user.episodes.push(...episodesOfSeries);

        user.save();

        return user;
    }

    async getFollowedSeries(userId) {
        const user = await userModel.findOne({ _id: userId }).exec();

        const series = await seriesModel.find({ _id: { $in: user.following } });

        console.log("series found for user", series);

        return series;
    }

    async saveEpisode(userID, episodeID) {
        const [user] = await userModel.findOne({ _id: userID }).exec();

        user.saveEpisode(episodeID);

        return user;
    }
}

const userController = new UserController();
exports.userController = userController;
