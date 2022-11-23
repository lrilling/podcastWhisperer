# Task Runner

As task runner we use [gulp](https://gulpjs.com/), which allows us to define tasks, that should be ran inside a `gulpfile.js`. 
We can use gulp for example to define a building function which transforms our javascript code written in the ECMAScript 2015 a.k.a ES6 standard into "classic" javascript. 

We define this task using the function `gulp.task`:

```
gulp.task("build", function () {
    return gulp.src("./src/**/*.js")
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(gulp.dest("./dist/"));
});
```

This function takes as a source all the javascript files that can be found in the `/src` directory and performs a transformation to classic javascript using [babel](https://babeljs.io/). Babel then outputs the transformed files into the destination folder `/dist`.

By setting the default task to be the task called "`build`" we can then execute the default task just by executing 
```
gulp
```

or 
```
gulp default 
```

via command line. 

We also add this as a script shortcut to the package.json:

```
{
    ...
    "scripts": {
        "build": "gulp default"
    },
}
```

This way we keep the build command to be independent from the task runner we actually use. 

This can later be combines with testing before building by adding a testing command and using that test command in the build command:
```
"scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules npx jest --testPathPattern=src",
    "build": "npm run test && gulp default"
},
```