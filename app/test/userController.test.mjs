import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import { userController } from "../dist/controller/user.js"

const username = "testUser";
const testName = "Max Mustermann";

let userID = undefined;

chai.use(chaiAsPromised);
const expect = chai.expect;


describe("User Controller", function () {
    it("should create a new user", async function () {
        const user = await userController.createUser(username, testName);
        expect(user.username).to.equal(username);
    });

    it("should not allow a second user with that username", async function () {
        await expect(userController.createUser(username, "Not Max")).to.be.rejectedWith(Error);
    })

    it("should find a user using it's username", async function () {
        const user = await userController.getUserByName(username);

        userID = user._id;
        expect(user.name).equal(testName);
    });

    it("should find all users", async function () {
        const users = await userController.getAllUsers();

        expect(users).to.be.a('Array');
    });

    it("should add an episode to user collection", async function () {
        expect(userController.addEpisode(userID, 12)).to.eventually.have.property("username");
    });
})


