import userModel from "../models/userModel"

class UserController {
    constructor() {
    }

    async createUser(username, name) {
        const existingUser = await userModel.find({ username: username }).exec();
        if (existingUser.length > 0) {
            console.log("A user with this username already exists!");
            return;
        }

        const newUser = new userModel({ username: username, name: name });
        await newUser.save();

        return newUser;
    }

    async getUser(username) {
        const user = userModel.find({ username: username });

        if (!user) {
            console.log(`A user with the username ${username} does not exist!`);
        }
    }
}

export default new UserController();
