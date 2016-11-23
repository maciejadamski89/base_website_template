var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

gulp.task('jade', function() {
    return gulp.src('src/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('dest'));
});

gulp.task('sass', function()
{
  gulp.src('src/sass/**/*.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest('dest/css/'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function()
{
  browserSync.init(
  {
    server:
    {
      baseDir: "dest/"
    }
 });
});

// Gulp Watch Task
gulp.task('watch', ['browser-sync'], function ()
{
  gulp.watch('src/**/*.jade', ['jade']);
  gulp.watch('src/**/*.sass', ['sass']);
  gulp.watch('dest/*.html').on('change', browserSync.reload);
  gulp.watch('dest/*.css').on('change', browserSync.reload);
});

// Gulp Default Task
gulp.task('default', ['watch']);


