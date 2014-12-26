var gulp = require('gulp');
var ts = require('gulp-typescript');
var eventStream = require('event-stream');
var run = require('gulp-run');
var concat = require('gulp-concat');

gulp.task('default', ['copy-html', 'generate-color-mappings', 'copy-css', 'scripts']);

gulp.task('scripts', ['generate-color-mappings'], function() {
	return gulp
	        .src('src/js/*.ts')
	        .pipe(ts())
	        .js.pipe(concat('all.js'))
					.pipe(gulp.dest('release/js'));
});

gulp.task('copy-css', function(){
	return gulp.src([
		'src/css/styles.css'
	], {base: 'src'}).pipe(gulp.dest('release'));
});

gulp.task('copy-html', function () {
	return gulp.src('src/html/index.html').pipe(gulp.dest('release'));
});

gulp.task('generate-color-mappings', function () {
	run('node src/generate-color-mappings.js src/js/colors.ts').exec();
});