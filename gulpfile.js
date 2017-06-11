let gulp = require('gulp');
let browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', ['browser-sync'], function () {
   gulp.watch('./**').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);