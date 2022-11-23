import userController from "../controller/user";
import { connect, disconnect, clearDB } from "./db";

jest.setTimeout(10000);

beforeAll(async () => {
    connect();
    clearDB();
});
afterEach(async () => clearDB());
afterAll(async () => disconnect());

describe("Test user Controller", () => {
    it("Tests creating a user", async (done) => {
        const username = "testUsername";
        const result = await userController.createUser(username, "Max Mustermann");
        console.log("result", result);
        expect(result.username).toBe(username);
    })
});
