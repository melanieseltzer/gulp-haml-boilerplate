var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var deploy = require('gulp-gh-pages');
var haml = require('gulp-haml');
var htmlbeautify = require('gulp-html-beautify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");

/*
  FILES
  Set your js and sass files here
  Make sure to put them in correct order for concat
*/
var files = {
  js: {
    src: [
      './src/js/vendor/jquery-2.2.4.js',
      './src/js/vendor/bootstrap.js',
      './src/js/all.js']
  },
  sass: {
    src: [
      './src/sass/vendor/bootstrap.scss',
      './src/sass/vendor/font-awesome.scss',
      './src/sass/all.scss']
  }
}

/*
  PATHS
  Set your file paths here, modify depending on your workflow/naming
*/
var paths = {
    watch: {
      server: './dist/'
    },
    images: {
        input: './src/img/**/*',
        output: './dist/img/'
    },
    fonts: {
        input: './src/fonts/**/*',
        output: './dist/fonts/'
    },
    js: {
        input: './src/js/**/*.js',
        output: './dist/js/'
    },
    css: {
        input: './src/sass/**/*.{scss,sass}',
        output: './dist/css/'
    },
    haml: {
        input: './src/haml/**/*.haml',
        output: './dist/'
    }
};

/*
  CSS
  Compile from sass > css and copy to dist folder, then concat and minify for production
  Add to stream to watch for changes
*/
gulp.task('css', function(){
  return gulp.src(files.sass.src, {base: './src/sass'})
    .pipe(sass())
    .pipe(gulp.dest(paths.css.output))
    .pipe(concat('all.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.css.output))
    .pipe(browserSync.stream());
});

/*
  JS
  Copy to dist folder then concat and uglify for production
  Add to stream to watch for changes
*/
gulp.task('js', function() {
  return gulp.src(files.js.src, {base: './src/js'})
    .pipe(gulp.dest(paths.js.output))
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.output))
    .pipe(browserSync.stream());
});

/*
  HAML
  Compile to vanilla html
  Add to stream to watch for changes
*/
gulp.task('haml', function(){
  return gulp.src(paths.haml.input)
    .pipe(haml())
    .pipe(gulp.dest(paths.haml.output))
    .pipe(browserSync.stream());
});

/*
  HTML BEAUTIFY
  If you need beautified (unminified) version of your html files
*/
gulp.task('html', ['haml'], function() {
  var options = {
    indentSize: 2
  };
  gulp.src('./dist/**/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./html'));
});

/*
  FONTS
  Copy to dist folder for production
*/
gulp.task('fonts', function() {
  return gulp.src(paths.fonts.input)
    .pipe(gulp.dest(paths.fonts.output));
});

/*
  IMAGES
  Compress and copy to dist folder for production
*/
gulp.task('images', function() {
  return gulp.src(paths.images.input)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.output));
});

/*
  LOCAL DEVELOPMENT
  Run all tasks, start server and watch for file changes
*/
gulp.task('serve', ['css', 'js', 'haml', 'fonts', 'images'], function() {
  browserSync.init({
    server: paths.watch.server
  });
  gulp.watch(paths.css.input, ['css']);
  gulp.watch(paths.haml.input, ['haml']);
  gulp.watch(paths.js.input, ['js']);
  gulp.watch(paths.css.input).on('change', browserSync.reload);
  gulp.watch(paths.haml.input).on('change', browserSync.reload);
  gulp.watch(paths.js.input).on('change', browserSync.reload);
});

/*
  GITHUB PAGES
  Push dist folder to gh-pages branch for production
*/
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(deploy());
});

/*
  EASY CLEANUP
  Delete dist/html folder
*/
gulp.task('clean', function () {
  return gulp.src(['dist', 'html'], {read: false})
    .pipe(clean());
});

/*
  DEFAULT TASK RUNNER
*/
gulp.task('default', ['serve']);
