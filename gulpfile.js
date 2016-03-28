var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    fallback: "ch2.html"
  });
});
 
gulp.task('default', ['webserver']);
