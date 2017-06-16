var gulp = require('gulp');
var sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css');
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    ignore = require('gulp-ignore'),
    zip = require('gulp-zip'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'Android >= 2.3'
];

gulp.task('styles', function() {
  return gulp
    .src('dev/sass/main.scss')
    //.pipe(sourcemaps.init())
    .pipe(sass({errLogToConsole: true}))
    //.pipe(sourcemaps.write({includeContent: false, sourceRoot: '.'}))
    //.pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2.3', 'iOS 6'], cascade: false}))
    //
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'SASS processing and minifying complete' }));
});

gulp.task('scripts', function() {
  return gulp.src('dev/javascript/**/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    .pipe(uglify().on('error', function(e){ console.log(e); }))
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
  return gulp.src('dev/images/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/img'))
    .pipe(notify({ message: 'Images task complete' }));
});
gulp.task('sync', function() {
    //watch files
    var files = [
    'dist/css/**.css',
    'dist/js/**.js',
    'dist/img/*.{png,jpg,gif}',
    '**/*.php',
    'index.html'
    ];

    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    //proxy: "project.dev",
    //port: 8080,
    notify: true,
    injectChanges: true
    });
});

gulp.task('watch', ['sync'], function () {
  gulp.watch('dev/sass/**/**.scss', ['styles']);
  gulp.watch('dev/javascript/*.js', ['scripts']);
  gulp.watch('dev/imgages/*.*', ['images']);
  gulp.watch('**/.DS_Store', ['remove']);
  gulp.watch('**/**.php');

});


gulp.task('clean', function() {
  del(['dist/css', 'dist/js', 'dist/img'])
  notify({ message: 'Clean task complete' });
});

gulp.task('remove', function() {
  del('**/.DS_Store')
  notify({ message: 'Clean task complete' });
});

gulp.task('build', function() {

  gulp.src(['**/**','!node_modules/**','!dist/**','!**/.sass-cache','!**/.DS_Store'])
  	.pipe(zip('memories.zip'))
  	.pipe(gulp.dest('../'))
  	.pipe(notify({ message: 'Zip task complete', onLast: true }));

});

gulp.task('default',['watch']);
