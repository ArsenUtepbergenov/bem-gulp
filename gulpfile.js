const gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create();

const paths = {
  styles: ['src/blocks/**/*.scss'],
  scripts: ['src/blocks/**/*.js'],
  index: ['public/index.html']
};

// copy all js files to public folder
gulp.task('copy-js', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/js/'));
});

// watch js files for reload page
gulp.task('js-watch', ['copy-js'], function(done) {
  browserSync.reload();
  done();
});

// styles: compile sass -> add prefixes -> concat
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['ie >= 9',
                 'Firefox >= 40',
                 'Chrome >= 40',
                 'Safari >= 7'
      ],
      cascade: false
    }))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.stream());
});

// gulp dev
gulp.task('dev', ['styles'], function() {

  browserSync.init({
    server: 'public/'
  });

  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.scripts, ['js-watch']);
  gulp.watch(paths.index).on('change', browserSync.reload);
});

gulp.task('default', ['dev']);
