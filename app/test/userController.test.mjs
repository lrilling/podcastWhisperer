import { userController } from "../dist/controller/user.js"
import userModel from "../dist/models/userModel.js"
import assert, { doesNotMatch } from "assert";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { connect, disconnect, clearDB } from "../testHelper/db.js";

const username = "testUser";
const testName = "Max Mustermann";

let userID = undefined;

chai.use(chaiAsPromised);
const expect = chai.expect;


describe("User Controller", function () {
    before(function () {
        connect();
        clearDB();
    });
    after(function () {
        clearDB();
        disconnect();
    });
    it("should create a new user", async function () {
        const user = await userController.createUser(username, testName);
        expect(user.username).to.equal(username);
    });

    it("should not allow a second user with that username", async function () {
        await expect(userController.createUser(username, "Not Max")).to.be.rejectedWith(Error);
    })

    it("should find a user using it's username", async function () {
        const user = await userController.getUser(username);

        userID = user._id;
        expect(user.name).equal(testName);
    });

    it("should find all users", async function () {
        const users = await userController.getAllUsers();

        expect(users).to.be.a('Array');
    });

    it("should add an episode to user collection", async function () {
        expect(userController.addEpisode(userID, 12)).to.eventually.have.property("username");
    })

    // it("should only add episodes that actually exist", function () {
    //     // TODO
    // })

    // it("should be able to favorise series", async function () {
    //     await expect(userController.favorizeSeries(userID, 1)).not.to.throw();
    // });

    // it("should be possible to delete an episode", async function () {
    //     await expect(userController.removeEpisode(userID, 12)).not.to.throw();
    // })
})


