const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const SASS_FILEPATH = './src/**/*.scss';
const JS_FILEPATH = 'src/**/*.js';
 
gulp.task('css', () => {
 return gulp.src('./src/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./css'));
});

gulp.task('js', () => {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js', 'css', 'watch']);

gulp.task('watch', () => {
  gulp.watch(SASS_FILEPATH, ['css']);
  gulp.watch(JS_FILEPATH, ['js']);
});

gulp.task('build', () => {
  return gulp.src(JS_FILEPATH)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(minify())
    .pipe(gulp.dest('dist'));
})

