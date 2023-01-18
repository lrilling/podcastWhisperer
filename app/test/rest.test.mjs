import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiHttp from "chai-http";

import app from "../dist/index.js";

process.env.NODE_ENV = "testing";

chai.use(chaiAsPromised);
chai.use(chaiHttp);

const server = app.default; // not really sure why, but the export of the HTTP instance in index.js contains a 'default' object, that is the actual instance

const expect = chai.expect;

describe("Test routes", function () {
    describe("POST /users", function () {
        it("creates a user that can then be accessed", async function () {
            const testUser = {
                username: "TestUserName",
                name: "Max Mustermann"
            };

            chai.request(server)
                .post("/users")
                .send(testUser)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a("string");

                    chai.request(server)
                        .get("/users")
                        .end((err, res) => {
                            console.log("users after post: ", res.body);
                            expect(res).to.have.status(200);
                        })
                });
        })
    })

    describe("GET /users", function () {
        it("answers", async function () {
            chai.request(server)
                .get("/users")
                .end((err, res) => {
                    console.log("users body: ", res.body);
                    expect(res).to.have.status(200);
                });
        });
    });

    describe("POST /series", function () {
        it("creates a user that can then be accessed", async function () {
            const series = {
                name: "TestSeries"
            };

            chai.request(server)
                .post("/users")
                .send(testUser)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a("string");
                });
        });
    });

    // describe("POST /series/episodes", function () {
    //     doc
    // })

    describe("GET /series", function () {
        it("answers", async function () {
            chai.request(server)
                .get("/series")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                });
        });
    });

});