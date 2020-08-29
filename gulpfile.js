let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))//{outputStyle: 'compressed'} - минификатор
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function () {
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('php', function () {
    return gulp.src('app/*.php')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
})

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
    gulp.watch('app/*.php', gulp.parallel('php'))
});

gulp.task('default', gulp.parallel('scss', 'js','browser-sync', 'watch'))


/*
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
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/!*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({ stream: true }));
});

// Move the javascript files into our /app/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('code', function() {
    return gulp.src('app/!**!/!*.html')
        .pipe(browserSync.reload({ stream: true }))
});


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass'), function() {

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/!*.scss'], ['sass']);
    // gulp.watch("app/!*.html").on('change', browserSync.reload);
});


gulp.task('watch', function () {
    gulp.watch('./app/scss/!**!/!*.scss', gulp.series('sass'));
    // gulp.watch('app/sass/!**!/!*.sass', ['sass']);
    gulp.watch('app/!*.html').on('change', browserSync.reload);
    gulp.watch('app/!**!/!*.php').on('change', browserSync.reload);
    gulp.watch('./app/scss/!**!/!*.scss', browserSync.reload);
});//автоматический запуск

gulp.task('default',  gulp.series('code','sass', 'js', 'serve', 'watch'));
gulp.task('build', gulp.series('default', gulp.parallel('watch', 'browser-sync')));*/
