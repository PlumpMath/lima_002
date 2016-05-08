
var path = require('path');
var gulp = require('gulp');
var ts = require('gulp-typescript');
// var merge = require('merge2');

var clean = require('gulp-clean');

gulp.task('clean', function() {
	return gulp.src('./build/**', {read: false})
		.pipe(clean());
});

gulp.task('build', function () {
	var tsProject = ts.createProject(path.resolve('./tsconfig.json'));
	return gulp.src(path.resolve('./src/**/*.ts'))
		.pipe(ts(tsProject))
		.js
		.pipe(gulp.dest(path.resolve('./build/')))
});

gulp.task('watch', function () {
	// gulp.run('clean');
	gulp.run('build');
    gulp.watch('./src/**/*.ts', ['build']);
});
