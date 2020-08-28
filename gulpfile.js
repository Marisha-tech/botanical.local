var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "botanical.local",
        notify: false,
        browser: ["firefox"],
    })
});
function bsReload(done) { browserSync.reload(); done() };

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.reload({ stream: true }));
});

// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('code', function() {
    return gulp.src('src/**/*.html')
        .pipe(browserSync.reload({ stream: true }))
});


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass'), function() {

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
    // gulp.watch("src/*.html").on('change', browserSync.reload);
});


gulp.task('watch', function () {
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
    // gulp.watch('src/sass/**/*.sass', ['sass']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/**/*.php').on('change', browserSync.reload);
    gulp.watch('./src/scss/**/*.scss', browserSync.reload);
});//автоматический запуск

// gulp.task('default',  gulp.series('code','sass', 'js', 'serve', 'watch'));
gulp.task('build', gulp.series('sass','watch', gulp.parallel('watch', 'browser-sync')));