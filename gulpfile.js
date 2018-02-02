var gulp = require('gulp');
var babel = require('gulp-babel');
var browsersync = require('browser-sync').create();
var clean = require('gulp-clean');
var cleancss = require('gulp-clean-css');
var deploy = require('gulp-gh-pages');
var gulpif = require('gulp-if');
var haml = require('gulp-haml');
var htmlbeautify = require('gulp-html-beautify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");
var useref = require('gulp-useref');

/* ------------------------- *
 *          PATHS
 * ------------------------- */

// Set your file paths here, modify depending on your workflow/naming
var paths = {
    server: 'tmp',
    images: {
        src: 'src/img/**/*',
        tmp: 'tmp/img',
        dist: 'dist/img'
    },
    fonts: {
        src: 'src/fonts/**/*',
        tmp: 'tmp/fonts',
        dist: 'dist/fonts'
    },
    js: {
        src: 'src/js/**/*.js',
        tmp: 'tmp/js',
        dist: 'dist/js'
    },
    css: {
        src: 'src/sass/**/*.{css,scss,sass}',
        tmp: 'tmp/css',
        dist: 'dist/css'
    },
    haml: {
        src: 'src/haml/**/*.haml'
    },
    html: {
        tmp: 'tmp',
        dist: 'dist'
    },
    useref: {
        tmp: 'tmp/**/*.html',
        dist: 'dist'
    }
};

/* ------------------------- *
 *       PREPROCESSING
 * ------------------------- */

// Compile: Sass
// Compile from Sass to vanilla CSS
gulp.task('compile:sass', function(){
  return gulp.src(paths.css.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.css.tmp))
    .pipe(browsersync.stream());
});

// Compile: Haml
// Compile from Haml to vanilla HTML
gulp.task('compile:haml', function(){
  return gulp.src(paths.haml.src)
    .pipe(haml())
    .pipe(htmlbeautify({indent_size: 2}))
    .pipe(gulp.dest(paths.html.tmp))
    .pipe(browsersync.stream());
});

// Compile: Js
// Compile from ES6 to vanilla JavaScript
gulp.task('compile:js', function() {
  return gulp.src(paths.js.src)
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest(paths.js.tmp))
    .pipe(browsersync.stream());
});

/* ------------------------- *
 *          FILES
 * ------------------------- */

// Copy: Fonts
// Copy fonts to dist folder for production
gulp.task('copy:fonts', function() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.tmp))
    .pipe(gulp.dest(paths.fonts.dist))
});


// Copy: Images
// Compress and copy to dist folder for production
gulp.task('copy:images', function() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.tmp))
    .pipe(gulp.dest(paths.images.dist))
});

/* ------------------------- *
 *          BUILD
 * ------------------------- */

// Build: Assets
// Concat and minify styles and scripts
gulp.task('build', ['compile:sass', 'compile:haml', 'compile:js', 'copy:fonts', 'copy:images'], function () {
    return gulp.src(paths.useref.tmp)
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', cleancss()))
      .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
      .pipe(gulp.dest(paths.useref.dist));
});

/* ------------------------- *
 *         CLEANUP
 * ------------------------- */

// Delete tmp folder for easy cleanup
gulp.task('clean:tmp', function () {
  return gulp.src(['tmp'], {read: false})
    .pipe(clean());
});
gulp.task('clean:dist', function () {
 return gulp.src(['dist'], {read: false})
   .pipe(clean());
});

gulp.task('clean', ['clean:tmp', 'clean:dist']);

/* ------------------------- *
 *     LOCAL DEVELOPMENT
 * ------------------------- */

// Run all tasks, start server and watch for file changes
gulp.task('serve', ['build'], function() {
  browsersync.init({
    server: paths.server
  });
  gulp.watch(paths.css.src, ['compile:sass']);
  gulp.watch(paths.haml.src, ['compile:haml']);
  gulp.watch(paths.js.src, ['compile:js']);
  gulp.watch(paths.css.tmp).on('change', browsersync.reload);
  gulp.watch(paths.html.tmp).on('change', browsersync.reload);
  gulp.watch(paths.js.tmp).on('change', browsersync.reload);
});

// Default task runner
gulp.task('default', ['serve']);


/* ------------------------- *
 *        DEPLOYMENT
 * ------------------------- */

// Push dist folder to gh-pages branch for production
gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe(deploy());
});
