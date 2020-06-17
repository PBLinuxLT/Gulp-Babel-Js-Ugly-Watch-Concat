var gulp = require("gulp");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src("src/**/*.js")
    // .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    // .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

// Minify Individual Files
gulp.task('build', () => {
  return gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(rename(function (path) {
        path.extname = '.min.js';
      }))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest('dist'))
});

// minify all.js and add source map
gulp.task("minify", function () {
  return gulp.src("dist/all.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(uglify())
      .pipe(rename(function (path) {
        path.extname = '.min.js';
      }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', gulp.series(['default', 'minify']));
});