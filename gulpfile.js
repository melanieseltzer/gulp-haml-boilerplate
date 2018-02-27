var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var browserify = require('browserify');
var browsersync = require('browser-sync').create();
var buffer = require('vinyl-buffer');
var cleancss = require('gulp-clean-css');
var del = require('del');
var deploy = require('gulp-gh-pages');
var gulpif = require('gulp-if');
var gzip = require('gulp-gzip');
var pug = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
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
  assets: {
    src: 'src/assets/**/*',
    tmp: 'tmp/assets',
    dist: 'dist/assets'
  },
  js: {
    src: 'src/js/**/*.js',
    tmp: 'tmp/js',
    dist: 'dist/js'
  },
  styles: {
    src: 'src/styles/**/*.{css,scss,sass}',
    tmp: 'tmp/css',
    dist: 'dist/css'
  },
  views: {
    src: 'src/views/**/*.pug',
    _src: 'src/views/**/!(_)*.pug'
  },
  html: {
    src: 'tmp/**/*.html'
  },
  src: 'src',
  tmp: 'tmp',
  dist: 'dist'
};

/* ------------------------- *
 *         CLEANUP
 * ------------------------- */

gulp.task('clean:tmp', function () {
  return del([
    'tmp'
  ]);
});

gulp.task('clean:dist', function () {
  return del([
    'dist'
  ]);
});

// Delete tmp and dist folder for easy cleanup
gulp.task('clean', ['clean:tmp', 'clean:dist']);

/* ------------------------- *
 *       PREPROCESSING
 * ------------------------- */

// Compile Sass
gulp.task('compile:sass', function(){
  return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
    .pipe(sass({
      // Vendor files
      includePaths: [
        "./node_modules/normalize.css",
        "./node_modules/bootstrap/dist/css"
      ]
    }))
    .pipe(postcss([ autoprefixer() ]))
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.tmp))
    .pipe(browsersync.stream());
});

// Compile Js
gulp.task('compile:js', function () {
  var b = browserify({
    entries: './src/js/main.js',
    debug: true,
    paths: [
      // Vendor files
      './node_modules/jquery/dist',
      './node_modules/popper.js/dist/umd',
      './node_modules/bootstrap/dist/js'
    ]
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(babel({
        presets: ['env']
      }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.js.tmp));
});

// Compile Pug
gulp.task('compile:pug', function(){
  return gulp.src(paths.views._src)
    .pipe(pug())
    .pipe(htmlbeautify({indent_size: 2}))
    .pipe(gulp.dest(paths.tmp))
    .pipe(browsersync.stream());
});

gulp.task('files', ['compile:sass', 'compile:js', 'compile:pug']);

/* ------------------------- *
 *     LOCAL DEVELOPMENT
 * ------------------------- */

// Copy asset files to tmp
gulp.task('copy', function() {
 return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.tmp));
});

// Start server and watch for changes
gulp.task('serve', ['copy', 'files'], function() {
  browsersync.init({
    server: paths.tmp
  });
  gulp.watch(paths.styles.src, ['compile:sass']);
  gulp.watch(paths.views.src, ['compile:pug']);
  gulp.watch(paths.js.src, ['compile:js']);
  gulp.watch(paths.tmp + '/**/*').on('change', browsersync.reload);
});

/* ------------------------- *
 *     PRODUCTION BUILD
 * ------------------------- */

// Copy asset files to dist
// Also compress images
gulp.task('copy:compress', function() {
  return gulp.src(paths.assets.src)
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest(paths.assets.dist));
});

// Build files for production
// Concat, minify, gzip
gulp.task('build:files', ['copy:compress', 'files'], function () {
  return gulp.src(paths.html.src)
    .pipe(useref({searchPath: 'tmp'}))
    .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
   	.pipe(gulpif('*.js', uglify()))
   	.pipe(gulpif('*.css', cleancss()))
    .pipe(gulp.dest(paths.dist))
    .pipe(gzip())
    .pipe(gulp.dest(paths.dist));
});

// Replace Base path
// For Github pages we have to replace the base path
// Remove this if not using Github pages
gulp.task('replace:basepath', ['build:files'], function () {
  return gulp.src('dist/**/*.{html,css}')
    // For relative links and stylesheet refs
    .pipe(replace('href="/', 'href="' + base.url))
    // For any src references e.g <img>, <script>
    .pipe(replace('src="/', 'src="' + base.url))
    // For font-face references
    .pipe(replace('url(/', 'url(' + base.url))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['replace:basepath'], function () {
  return del([
    'tmp'
  ]);
});

/* ------------------------- *
 *        DEPLOYMENT
 * ------------------------- */

// Push dist folder to gh-pages branch for production
gulp.task('deploy', ['build'], function() {
  return gulp.src('dist/**/*')
    .pipe(deploy());
});

/* ------------------------- *
 *         DEFAULT
 * ------------------------- */

// Default task runner
gulp.task('default', ['serve']);
