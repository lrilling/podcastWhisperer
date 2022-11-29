const gulp = require("gulp");
const babel = require("gulp-babel");
const jest = require("gulp-jest");

// gulp.task("test", function () {
//     return gulp.src("./src/**/*.js")
//         .pipe(jest.run({ json: false }, ['./src']));
// })

function build(cb) {
    return gulp.src("./src/**/*.js")
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(gulp.dest("./dist/"));
}

gulp.task("build", function () {
    return gulp.src("./src/**/*.js")
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(gulp.dest("./dist/"));
});

// gulp.task("default", gulp.watch("./src/**/*.js", build));
exports.default = function () {
    gulp.watch("./src/**/*.js", build);
}

