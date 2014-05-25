var http = require('http');
var gulp = require('gulp');
var browserify = require('browserify');
// var concat = require('gulp-concat');
// var less = require('gulp-less');
var refresh = require('gulp-livereload');

// var minifyCSS = require('gulp-minify-css');
var embedlr = require('gulp-embedlr');
var lrserver = require('tiny-lr')();
var source = require('vinyl-source-stream');
// var imagemin = require('gulp-imagemin');
var dist = 'dist';

// Static Server
// =============

gulp.task('server', function(next) {
  var connect = require('connect'),
      server = connect();

  lrserver.listen(35729);

  server
  .use(connect.static(dist))
  // .use(connect.static(__dirname + '/'))
  .listen(8080, next);
  
});



// ===================

gulp.task('vendor', function() {
    return browserify()
        .require('underscore')
        .require('react')
        .bundle()
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('dist/build/'))
        .pipe(refresh(lrserver));
});

gulp.task('html', function() {
    return gulp.src("app/*.html")
        .pipe(embedlr())
        .pipe(gulp.dest('dist/'))
        .pipe(refresh(lrserver));
})

gulp.task('scripts', function() {
    return browserify('./app/src/app.js')
        .external('underscore')
        .external('react')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist/build/'))
        .pipe(refresh(lrserver));
});

gulp.task('watch', function () {
  gulp.watch('app/src/**', ['scripts']);
  // gulp.watch('app/css/**', ['styles']);
  gulp.watch('app/**/*.html', ['html']);
  // gulp.watch('app/assets/**', ['assets']);
});

gulp.task('default', ['vendor', 'scripts', 'html','server', 'watch']);
