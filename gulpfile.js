var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
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

gulp.task('styles', function() {
  return sass('dev/sass/**.scss', { style: 'expanded' })
    .pipe(sourcemaps.init())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'SASS processing minifying and complete' }));
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
  gulp.watch('dev/img/*.*', ['images']);
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
