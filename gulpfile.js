var gulp = require('gulp');
var babel = require('gulp-babel');
var browsersync = require('browser-sync').create();
var cleancss = require('gulp-clean-css');
var del = require('del');
var deploy = require('gulp-gh-pages');
var gulpif = require('gulp-if');
var haml = require('gulp-haml');
var htmlbeautify = require('gulp-html-beautify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var injectpartials = require('gulp-inject-partials');
var npmdist = require('gulp-npm-dist');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var uglify = require("gulp-uglify");
var useref = require('gulp-useref');

/* ------------------------- *
 *        BASE PATHS
 * ------------------------- */

// If you plan to publish to Github pages, you will need to do a base path config
var base = {
  // Your Github pages base URL
  // Same name as your repo
  url: '/gulp-haml-boilerplate/'
}

/* ------------------------- *
 *          PATHS
 * ------------------------- */

// Set your file paths here, modify depending on your workflow/naming
var paths = {
    server: 'build',
    img: {
        src: 'src/img/**/*',
        build: 'build/img',
        dist: 'dist/img'
    },
    static: {
        src: 'src/static/**/*',
        build: 'build/static',
        dist: 'dist/static'
    },
    js: {
        src: 'src/js/**/*.js',
        build: 'build/js',
        dist: 'dist/js'
    },
    css: {
        src: 'src/sass/**/*.{css,scss,sass}',
        build: 'build/css',
        dist: 'dist/css'
    },
    haml: {
        src: 'src/haml/**/*.haml'
    },
    html: {
        src: 'build/**/*.html',
        build: 'build',
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
    .pipe(gulp.dest(paths.css.build))
    .pipe(browsersync.stream());
});

// Compile: Haml
// Compile from Haml to vanilla HTML
gulp.task('compile:haml', function(){
  return gulp.src(paths.haml.src)
    .pipe(haml())
    .pipe(htmlbeautify({indent_size: 2}))
    .pipe(gulp.dest(paths.html.build))
    .pipe(browsersync.stream());
});

// Inject: Partials
// Inject all the html partials
gulp.task('inject:partials', ['compile:haml'], function () {
  return gulp.src(paths.html.src)
    .pipe(injectpartials({removeTags: true}))
    .pipe(gulp.dest(paths.html.build));
});

gulp.task('haml', ['inject:partials'])

// Compile: Js
// Compile from ES6 to vanilla JavaScript
gulp.task('compile:js', function() {
  return gulp.src(paths.js.src)
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest(paths.js.build))
    .pipe(browsersync.stream());
});

/* ------------------------- *
 *          FILES
 * ------------------------- */

// Copy: Images
gulp.task('copy:images', function() {
 return gulp.src(paths.img.src)
    .pipe(gulp.dest(paths.img.build))
});

// Copy: Static files
gulp.task('copy:static', function() {
 return gulp.src(paths.static.src)
    .pipe(gulp.dest(paths.static.build))
    .pipe(gulp.dest(paths.static.dist))
});

// Copy: Dependencies
gulp.task('copy:libs', function() {
  gulp.src(npmdist({ copyUnminified: true}), {base:'./node_modules'})
    .pipe(gulp.dest('build/lib'));
});

// Compress: Images
gulp.task('compress:images', function() {
  gulp.src(paths.img.src)
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest(paths.img.dist))
});

/* ------------------------- *
 *     LOCAL DEVELOPMENT
 * ------------------------- */

// Start server and watch for changes
gulp.task('serve', ['compile:sass', 'haml', 'compile:js', 'copy:images', 'copy:static', 'copy:libs'], function() {
  browsersync.init({
    server: paths.server
  });
  gulp.watch(paths.css.src, ['compile:sass']);
  gulp.watch(paths.haml.src, ['haml']);
  gulp.watch(paths.js.src, ['compile:js']);
  gulp.watch(paths.css.src).on('change', browsersync.reload);
  gulp.watch(paths.html.src).on('change', browsersync.reload);
  gulp.watch(paths.js.src).on('change', browsersync.reload);
});

// Default task runner
gulp.task('default', ['serve']);

/* ------------------------- *
 *     PRODUCTION BUILD
 * ------------------------- */

// Build files for production
// Concat and minify styles and scripts
gulp.task('build:files', ['compile:sass', 'haml', 'compile:js', 'copy:images', 'copy:static', 'compress:images', 'copy:libs'], function () {
    return gulp.src(paths.html.src)
      .pipe(useref({searchPath: 'build'}))
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', cleancss()))
      .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
      .pipe(gulp.dest(paths.html.dist));
});

// We don't want partials to render in the dist folder, so delete them
gulp.task('clean:partials', ['build:files'], function () {
  return del([
    'dist/partials'
  ]);
});

// Replace Base path
// For Github pages we have to replace the base path
// Remove this if not using Github pages
gulp.task('replace:basepath', ['clean:partials'], function () {
 return gulp.src('dist/**/*.{html,css}')
  // For relative links and stylesheet refs
  .pipe(replace('href="/', 'href="' + base.url))
  // For any src references e.g <img>, <script>
  .pipe(replace('src="/', 'src="' + base.url))
  // For font-face references
  .pipe(replace('url(/', 'url(' + base.url))
  .pipe(gulp.dest('dist'));
});

gulp.task('build', ['replace:basepath']);

/* ------------------------- *
 *        DEPLOYMENT
 * ------------------------- */

// Push dist folder to gh-pages branch for production
gulp.task('deploy', ['build'], function() {
  return gulp.src('dist/**/*')
    .pipe(deploy());
});

/* ------------------------- *
 *         CLEANUP
 * ------------------------- */

gulp.task('clean:build', function () {
  return del([
    'build'
  ]);
});

gulp.task('clean:dist', function () {
  return del([
    'dist'
  ]);
});

// Delete build and dist folder for easy cleanup
gulp.task('clean', ['clean:build', 'clean:dist']);
