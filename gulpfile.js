var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    fallback: "boxplots.html"
  });
});
 
gulp.task('default', ['webserver']);
