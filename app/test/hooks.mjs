import { connect, disconnect } from "../testHelper/db.js";

export const mochaHooks = {
    beforeAll: async function () {
        this.timeout(3000);
        await connect();
    },
    afterAll: async function () {
        await disconnect();
    }
};