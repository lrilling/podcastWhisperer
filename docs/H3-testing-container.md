# Hito 3: Container for testing 

## Dockerfile
The Dockerfile uses the `node:latest` image from the docker hub as a base. 
Since the container is supposed to run all the tests defined in the [test directory](/app/test/) it is necessary that all the node dependencies defined in the `package.json` file are installed correctly into the folder. 

To make sure that no wrong installation from the actual host system is copied, a `.dockerignore` file is used to prevent the copying of the `node_modules` folder.

The Dockerfile defines the work directory as `/app` by using the command `WORKDIR /app`, after that all other commands will be executed from that folder.

`COPY ./app .` therefore copies all the folder's from the repository's folder `/app` into the `/app` folder in the container.

`RUN npm install` then installs all the npm packages necessary. Since we previously copied all the files from the `/app` folder the `package.json` is also available in the container and delivers the base for the `npm install`.


Finally `CMD ["npm", "test"]` defines the command that is executed once a container based on the image defined by the Dockerfile is started.

## Building the image
An image is then built based on the Dockerfile by running:
`docker build --platform linux/amd64 -t lrilling/podcast-whisperer .`

Defining the `--platform` is necessary, since parts of the testing is using the npm package `mongo-memory-server` to make sure all the tests are only executed on a testing database and not the real database instance. This npm package installs a version of mongodb into the container once it is first called. Since mongodb for debian is only available for the amd64 architecture (as described [here](https://www.mongodb.com/download-center/community/releases)), we need to define this platform when building the image to make sure all the containers based on the image use the right platform for the mongodb client to be installed correctly. 

## Pushing the container to docker hub
To push to the docker hub it is necessary to first login into the hub by running
```
docker login
```
and enter username and password once asked for. 

After the login an image can be pushed by using 
```
docker push username/image-name:tag
```

It is important that the image is previously build to match that name to make sure docker finds the right image to push and pushed it to the right repository into the user account on docker hub.

As we can see above in the building command used the image name is `lrilling/podcast-whisperer`, which is makes sure the image is pushed to the container repository `podcast-whisperer` in the user `lrilling`

## Pushing to GitHub Container Repo
To push to the container repository provided by github, it is necessary to log into the repository. This is again done using `docker login` this time using the url `ghcr.io`. The access to the GitHub container repository is not provided by using username and password, but username and a GitHub Token, which can be created in the user settings on the GitHub website. 

After creating the token it has to be stored as a local command line variable:
```
export CR_PAT=YOUR_TOKEN
```

than the following command will perform the login:
```
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin
```

A container can then be pushed to the GitHub container repository if it's name starts with `gitcr.io`, therefore we need to build the image as follows: 
```
docker build --platform linux/amd64 -t ghcr.io/lrilling/podcast-whisperer .

```
