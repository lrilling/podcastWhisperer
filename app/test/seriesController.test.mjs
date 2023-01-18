import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { connect, disconnect } from "../testHelper/db.js";

import { seriesController } from "../dist/controller/series.js";

chai.use(chaiAsPromised);
const expect = chai.expect;

const seriesName = "Test Series";
const episodeName = "#1 Episode";

describe("Series Controller", function () {
    it("should create a new series", async function () {
        const series = await seriesController.createSeries(seriesName);

        expect(series.name).to.equal(seriesName);
    });

    it("should add an episode to a series", async function () {
        const series = await seriesController.getSeriesByName(seriesName);
        const episode = await seriesController.addEpisode(series._id, episodeName, "https://localhost/blabla");

        expect(episode.number).to.equal(1);
        expect(episode.series).to.equal(series._id);
    });
})