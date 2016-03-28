var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    fallback: "d3ia.html"
  });
});
 
gulp.task('default', ['webserver']);
