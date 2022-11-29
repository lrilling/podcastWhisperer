import { userController } from "../dist/controller/user.js"
import userModel from "../dist/models/userModel.js"
import assert from "assert";
import { expect } from "chai";
import { connect, disconnect, clearDB } from "../testHelper/db.js";

// beforeAll(async () => {
//     connect();
//     clearDB();
// });
// afterEach(async () => clearDB());
// afterAll(async () => disconnect());

// describe("Test user Controller", () => {
//     this.timeout(5000);
//     it("Tests creating a user", async (done) => {
//         const userController = new UserController();
//         console.log(userController);
//         const username = "testUsername";
//         console.log("test");
//         userController.createUser(username, "Max Mustermann").then(() => {
//             console.log("result", result);
//             assert.strictEqual(result.$isNew, true);
//             done();
//         })
//     })
// });

// describe("User Controller", function () {
//     it("should be true", async function () {
//         console.log("what")
//         assert.equal(true, false);
//         // done();
//     });
// });

describe("User Controller", function () {
    before(function () {
        connect();
        clearDB();
    });
    afterEach(function () {
        clearDB();
    });
    after(function () {
        disconnect();
    });
    it("should create a new user", async function () {
        const username = "balsdflkajsdf";

        const user = await userController.createUser(username, "Max Mustermann");
        expect(user.username).to.equal(username);
    });
})

