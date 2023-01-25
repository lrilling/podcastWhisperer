# Hito 6: Service Composition

As already explained in [Hito 5](H5-microservice.md) we use *docker compose* to define and compose the services of our application. 

The definition of the services happens in the [`docker-compose.yml`](../../../podcastWhisperer/docker-compose.yml). 

We defined two services so far, one containing the business logic implemented in [`/app`](../../app/) and the other containing a database running MongoDB.

## Database
The database service is defined to be based on the `mongo:latest` image from docker hub:

```
db:
    image: mongo:latest
```

It has a volume mounted to `/data/db` to have the content of that folder in the container persistent even after the container is stopped:

```
db:
    volumes:
      - /data/db
```

To expose the service to other services the port of the MongoDB instance, which is normally `27017`, needs to be exposed. For simplicity we map it to the same machine on the host, which is not necessary, but keeps the code of the application simpler, because the port of the database would not change if we would start to use another instance of MongoDB running on the MongoCloud or on some other provider.
```
db:
    ports:
      - 27017:27017
```

## Backend Service
The backend service is build using the latest node image from docker hub:

```
backend:
    image: node:latest
```

Since our application's code uses port 3000 as defined in [`/app/src/index.js`](../../app/src/index.js) we have to expose that port in the service setup: 

```
backend:
    ...
    ports:
        - 3000:3000
```

To have all the necessary data available in the container we need to mount the [`/app`](../../app/) folder into the container. This is done using the `volumes` keyword in the docker compose YAML structure:
```
backend:
    ...
    volumes:
        - ./app:/app
```

`./app` is the app folder in our repository directory structure, whereas `/app` is the destination in the node container. The `node` image in docker hub uses that folder as the standard directory for the project code, that is then run. 


To actually run the code in the container, we need to define an entrypoint command, which is the command that is executed when the container is started:

```
backend:
    ...
    entrypoint: ["node", "/app/dist/index.js"]
```

This just executes the `index.js` file in the `dist` folder, which is the folder where the compiled code is placed after running `gulp build`. Another way would be to only mount the source code into the container and then build inside the container but this would need further configuration and the definition of a specific Dockerfile for the service. In order to keep it clean and simple we use the already compiled code in the container.

### Environment Variable
To make it still possible to run the code using a local node without the necessity of using docker, we need to make sure that the server defined in [`/src/index.js`](../../app/src/index.js) actually finds the correct MongoDB. In the docker compose setup the database is placed inside it's own service container with the name `db`, but on the local execution the app would rely on a local installation of MongoDB. To distinguish these use cases in the code we use environment variables, that can be accessed by the node environment. Specifically we define an environment variable `NODE_ENV`, which is a standard name of a variable influencing some node application. 

`NODE_ENV` can either be: 
- `container` 
- `testing`
- `local`

If it is `container` we define the URI for the database according to it's service name `db`, which is translated by docker's local DNS into the IP of the actual running container. Therefore the URI of the mongoDB for `NODE_ENV = container` is `mongodb://db:27017/test`. In this case the variable is set by docker compose, wich is configured in the `docker-compose.yml` as follows: 

```
backend:
    ...
    environment:
      - NODE_ENV=container
    depends_on:
      - db
```

Setting `depends_on` to be the database makes sure that the container is started, after the `db` service container is started to make sure the MongoDB instance is actually running when the application is trying to connect. 

For testing we rely on a mockup database using `MongoMemoryServer`, which is an NPM package running a mongoDB instance and only using the memory to store data, therefore not persistently and only for testing purposes. For `NODE_ENV = testing` we therefore use the URI by the MongoMemoryServer: `mongoUri = mongod.getUri();`.

For running the code using a local MongoDB, we can just use the `localhost` `mongodb://localhost:27017/test`. 