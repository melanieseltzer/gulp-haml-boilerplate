var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var browsersync = require('browser-sync').create();
var cleancss = require('gulp-clean-css');
var del = require('del');
var deploy = require('gulp-gh-pages');
var fileinclude = require('gulp-file-include');
var gulpif = require('gulp-if');
var haml = require('gulp-haml');
var htmlbeautify = require('gulp-html-beautify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var log = require('fancy-log');
var npmdist = require('gulp-npm-dist');
var postcss = require('gulp-postcss');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify-es').default;
var useref = require('gulp-useref');

/* ------------------------- *
 *        BASE PATHS
 * ------------------------- */

// If you plan to publish to Github pages, you will need to do a base path config
var base = {
  // Your Github pages base URL
  // Same name as your repo
  url: '/static-frontend-boilerplate/'
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
 *          FILES
 * ------------------------- */

// Copy: Images
gulp.task('copy:images', function() {
 return gulp.src(paths.img.src)
    .pipe(gulp.dest(paths.img.build));
});

// Copy: Static files
gulp.task('copy:staticbuild', function() {
 return gulp.src(paths.static.src)
    .pipe(gulp.dest(paths.static.build));
});

// Copy: Static files
gulp.task('copy:staticdist', function() {
 return gulp.src(paths.static.src)
    .pipe(gulp.dest(paths.static.dist));
});

// Copy: Dependencies
gulp.task('copy:libs', function() {
  return gulp.src(npmdist({ copyUnminified: true}), {base:'./node_modules'})
    .pipe(gulp.dest('build/lib'));
});

// Compress: Images
gulp.task('compress:images', function() {
  gulp.src(paths.img.src)
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest(paths.img.dist))
});

gulp.task('files', ['copy:images', 'copy:staticbuild', 'copy:staticdist', 'copy:libs', 'compress:images']);

/* ------------------------- *
 *       PREPROCESSING
 * ------------------------- */

// Compile: Sass
// Compile from Sass to vanilla CSS
gulp.task('compile:sass', function(){
  return gulp.src(paths.css.src)
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest(paths.css.build))
    .pipe(browsersync.stream());
});

// Compile: Js
// Compile from ES6 to vanilla JavaScript
gulp.task('compile:js', ['copy:libs'], function() {
  return gulp.src(paths.js.src)
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(gulp.dest(paths.js.build))
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
gulp.task('inject:partials', ['compile:sass', 'compile:js', 'compile:haml'], function () {
  return gulp.src(paths.html.src)
    .pipe(fileinclude({
      prefix: '__',
      basepath: 'build/partials'
    }))
    .pipe(gulp.dest(paths.html.build))
    .pipe(browsersync.stream());
});

gulp.task('haml', ['inject:partials']);

/* ------------------------- *
 *     LOCAL DEVELOPMENT
 * ------------------------- */

// Start server and watch for changes
gulp.task('serve', ['copy:images', 'copy:staticbuild', 'copy:libs', 'haml'], function() {
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

/* ------------------------- *
 *     PRODUCTION BUILD
 * ------------------------- */

// Build files for production
// Concat using useref
gulp.task('build:files', ['files', 'haml'], function () {
    return gulp.src(paths.html.src)
      .pipe(useref({searchPath: 'build'}))
      .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
      .pipe(gulp.dest(paths.html.dist));
});

// Generate the sourcemaps
gulp.task('sourcemaps', ['build:files'], function () {
   return gulp.src('dist/**/*.{css,js}')
     .pipe(sourcemaps.init())
       .pipe(gulpif('*.js', uglify()))
       error.log()
       .pipe(gulpif('*.css', cleancss()))
     .pipe(sourcemaps.write('.'))
     .pipe(gulp.dest(paths.html.dist));
});

// We don't want partials to render in the dist folder, so delete them
gulp.task('clean:partials', ['sourcemaps'], function () {
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

/* ------------------------- *
 *         DEFAULT
 * ------------------------- */

// Default task runner
gulp.task('default', ['serve']);
