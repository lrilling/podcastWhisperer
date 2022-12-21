# Continuous Integration

To move towards a continuous integration (CI), we use both github actions and travis to automate testing.

## Github Actions

[*github Actions*](https://docs.github.com/es/actions) is github's solution for CI, that can be enabled for repositories by adding a folder `.github/workflows` to the repository, which contains YAML-files describing workflows. 

### Workflow
A workflow consists of different jobs, that need to be completed to fulfill the workflow. This could for example be used to first checkout the latest commit, compile and build different files, test the build and the code using unit tests and finally deploy the built application onto a destined server. 

### Our workflow
Since we don't yet deploy our application, we can use github actions to test our code using the tests deined in the `app/test` directory. 

Therefore we create a YAML-file defining the workflow called [`testing.yml`](../.github/workflows/testing.yml) and define some basic information in the first lines:

```
name: "Github Action Testing"
on: [push]
```

This gives the workflow a name and defines the trigger using the keyword `on`. In our case we want the workflow to be automatically started whenever something is pushed to the repository. 

To then define jobs for the testing we have two options: either by using the container defined in the last [milestone](hitos/H3-testing-container.md) or by just defining and loading all necessary packages manually during the job. We will implement both versions to understand github actions a bit better.

#### Without container
If we don't use a container which provides us with all necessary packages already installed, we have to install them ourselves. 

We start by defining a new job:

```
jobs:
  test-without-container:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: "Install Node"
      uses: actions/setup-node@v1
      with:
        node-version: 18.12.1
    - name: "Install Mocha"
      run: npm install -g mocha
    - name: "Install dependencies"
      run: npm install
      working-directory: ./app
    - name: "Build project"
      run: gulp build
      working-directory: ./app
    - name: "Run tests"
      run: npm test
      working-directory: ./app
```

The job is called `test-without-container` and runs on an ubuntu system. Using `steps` we define all the steps that need to be done during this job. The first one uses another action, that is provided by github called `actions/checkoutv1`, which simply checksout the latest commit on the branch that was pushed to. After that we need to install all the dependencies for the testing environment and for our app. This means we first have to install Node.js, which can also be done by using another predefined github action, called `actions/setup-node@v1`, we define the node version to be `18.12.1`, since we know that our app can be compiled and tested in that environment. 

After that we use npm to install the dependencies, which includes first installing `mocha` globally (using the `-g` flag), since the job needs to have the Mocha CLI installed. After that `npm install` installs all dependencies defined in the package.json. For the job to find this file, we need to define the `working-directory`, since our app's files are located under [`./app`](../app/) (this is also necessary for the build and testing steps).

Once all dependencies are installed, we can run a build using `gulp` and finally run the tests using `npm test`. 

#### With container
By using a container based on the image we defined and uploaded to the github container registry, we don't have to define the environment that our tests need any further but just use the environment provided by the docker image. 

We define a second job to use the container: 
```
jobs:
  test:
    runs-on: ubuntu-latest
    container: 
      image: ghcr.io/lrilling/podcast-whisperer:latest
      credentials:
        username: ${{ github.actor }}
        password: ${{ secrets.github_token }}
      volumes:
        - ${{ github.workspace}}/app:/app
    steps:
      - name: "Checkout"
        uses: actions/checkout@v1
      - name: "Install dependencies"
        run: npm install
        working-directory: ./app
      - name: "Build app"
        run: gulp build
        working-directory: ./app
      - name: "Start testing"
        run: npm run test
        working-directory: ./app
```

We define a `container` for the job and link to our container image located in the github container registry [ghcr.io](ghrc.io). Sine docker needs to login to pull from the registry, we provide `credentials` using variables, that github provides to the action environment, namely `github.actor`, which is the username and `secrets.github_token`, which is the token defined in the developer settings of the github user (the creation of the token was explained in the last [milestone](hitos/H3-testing-container.md)). 

Additionally, we have to give the repository access to that specific package in the settings of package ghcr.io/lrilling/podcast-whisperer in github.

To give the container access to the latest state of the project, we mount the app folder from the current workspace into the container, by again using a github variable `github.workspace`, which is where the checkout of the repository will be placed. 

After that the steps first again do a checkout using `actions/checkout@v1` and then install all dependencies, build using gulp and run the tests, just as defined in the other job above. 


## Travis
Another way to implement a CI is using a tool, that has been around longer than github actions and therefore provides a better documentation and support for the usage with all kinds of build and testing tools: [Travis CI](https://www.travis-ci.com/). 

After creating an account and choose a pricing plan (the first executions are for free), the account can be connected to github and all repositories of a user, by installing Travis as a Github App, which then has access to chosen repositories. 

Then we can create CI jobs by defining them in the file `.tavis.yml` in the root folder of the repository. Travis is often used for testing and therefore provides a default setup for certain environments. We can define the environment by choosing `language: node_js`. Since node version 18 lead to internal problems due to some bugs in travis, we choose 17, which also works with our current setup. 

After that we can simply install all dependencies, by defining an install script: 

```
install:
  - cd app
  - npm install
```

`cd app` here again is necessary, since the `package.json` is located under `./app`. 

The final script for testing is then defined as: 

```
script: 
  - gulp build
  - npm test
``` 

Having mocha already installed automatically in the node_js environment makes the travis job definition much shorter than the github actions version, but since Travis no longer is available for free on a long term github actions would still be the preferred option for a CI based on a repository located on github.
