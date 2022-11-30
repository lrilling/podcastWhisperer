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

    async getUser(username) {
        const [user] = await userModel.find({ username: username }).exec();

        if (!user) {
            console.log("User not found!");
        }
        return user;
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

    async addEpisode(userID, episodeID) {
        const [user] = await userModel.findOne({ _id: userID }).exec();

        user.saveEpisode(episodeID);

        return user;
    }
}

const userController = new UserController();
exports.userController = userController;
