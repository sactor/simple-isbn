var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('default', function () {
    var tsResult = gulp.src('index.ts')
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(gulp.dest('.')),
        tsResult.js.pipe(gulp.dest('.'))
    ]);
});