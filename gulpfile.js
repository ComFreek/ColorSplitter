const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');

gulp.task('copy-non-js-files', function () {
	return gulp.src(
		['src/index.html', 'src/css/**/*', 'src/img/**/*'],
		{ base: 'src' }
	).pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('copy-non-js-files', () => {
	return browserify({
		basedir: '.',
		debug: true,
		entries: ['src/js/gui.ts'],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('dist'));
}));