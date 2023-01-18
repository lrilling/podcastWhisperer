# Hito 5: Development and Testing of Microservices

To transform the backend of our application into a microservice, we need to provide an API, that for example a frontend microservice could then use to render pages based on the data provided by the backend or that could be triggered by the frontend microservice to apply changes according to user input. 

## Composing the Services
We compose our services using [docker compose](https://docs.docker.com/compose/), which makes it easy to define services and start them by simply providing a [docker-compose.yml](../../docker-compose.yml). 

## REST API
The REST API is defined using the [`express.js`](https://expressjs.com/) framework, which is a lightweight framework which includes a http server and let's us define API endpoints. 

The endpoints are defined in [/app/src/index.js](../../app/src/index.js) in the following schema: 

```
app.get("/users/", async (req, res) => {
    const users = await userController.getAllUsers()
    res.send(JSON.stringify(users));
});
```
This endpoint for example can be used to retrieve an array containing all the users signed up to the platform. The data is sent in JSON format. 

The file uses the controller defined in the [controllers](../../app/src/controller/) folder. These are singletons and provide an API to the database models defined in [models](../../app/src/models/). 

The exact endpoints are documented under [API](../API.md).

## Database
To have a persistent storage of the applications data we provide a second microservice in form of a MongoDB instance running in a docker container. 

In the docker compose file the database is defined as follows: 
```
db:
    image: mongo:latest
    volumes:
      - /data/db
    ports:
     - 27017:27017
```

It simply uses the latest mongo image from docker hub and provides a volume to keep the data persistent. The volume is unnamed and mounted into the `/data/db` folder, which is where the mongo container keeps the database files. Thereby if the container is stopped, the data persists in the docker volume. 
The port mapping makes sure, that the container is accessible from other containers using the url `db:27017`. the domain `db`, which is the name of the services as defined in the `docker-compose.yml` can be used, because docker provides an internal DNS service, which translates the service names in URLs into the IP address of the docker container in the docker network. 

Therefore our microservice from above can access the database by using the url `mongodb://db:27017`. 


## Testing

Testing the routes can also be done using mocha, just as we use it to test our controllers themselves. 

Since we already use [chai](https://www.chaijs.com/api/) to assert the tests, we can use the [chai-http](https://www.chaijs.com/plugins/chai-http/) plugin to access a server. 

This makes it necessary to export the server in the [`index.js`](../../app/src/index.js) file, which slightly breaks with the idea of not changing the code to be able to test it. 

But by this we can import the http instance of the REST API and run tests as follows: 

```
describe("GET /users", function () {
    it("answers with 200", async function () {
        chai.request(server)
            .get("/users")
            .end((err, res) => {
                expect(res).to.have.status(200);
            });
    });
});
```

This checks if the route `/users` actually answers with HTTP status 200. 

More tests are defined under [rest.test.mjs](../../app/test/rest.test.mjs). 

