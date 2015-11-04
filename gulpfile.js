var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    install = require('gulp-install'),
    concat = require('gulp-concat'),
    templateCache = require('gulp-angular-templatecache'),
    clean = require('gulp-rimraf'),
    watch = require('gulp-watch'),
    wiredep = require('wiredep');

var paths = {
    js: [
        './js/app.js',
        './js/routes.js',
        './js/**/*.js',
        './generated/templates.js'
    ],
    templates: [
        './views/**/*.html',
        '/views/**/**/*.html'],
    css: [
        './css/app.css',
        './css/prva.css',
        './css/login.css',
        './css/main.css'
    ],
    scss: [
      './scss/*.scss'
    ]
};

gulp.task('templateCache', function () {
    return gulp.src(paths.templates)
        .pipe(templateCache({
            'filename': 'templates.js',
            'root': 'views',
            'module': 'myApp'
        }))
        .pipe(gulp.dest('./generated/'));
});

gulp.task('css', function () {
    gulp.src(paths.css)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./generated'))
});

gulp.task('js', function () {
    gulp.src(paths.js)
        .pipe(concat('main.js'))
//        .pipe(uglify())
        .pipe(gulp.dest('./generated'))
});

gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('install', function () {
    gulp.src(['./bower.json'])
        .pipe(install());
});

gulp.task('wiredep', ['install'], function () {
    wiredep({src: 'index.html'})
});



gulp.task('setup', ['wiredep', 'css', 'js', 'templateCache']);

gulp.task('watch', function () {
    gulp.watch([paths.templates, paths.js , paths.css, paths.scss], ['setup', 'sass']);
});
