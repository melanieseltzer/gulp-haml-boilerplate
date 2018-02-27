var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var browsersync = require('browser-sync').create();
var cleancss = require('gulp-clean-css');
var del = require('del');
var deploy = require('gulp-gh-pages');
var gulpif = require('gulp-if');
var pug = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
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
    server: 'tmp',
    img: {
        src: 'src/img/**/*',
        tmp: 'tmp/img',
        dist: 'dist/img'
    },
    static: {
        src: 'src/static/**/*',
        tmp: 'tmp/static',
        dist: 'dist/static'
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
        src: 'src/views/**/!(_)*.pug'
    },
    html: {
        src: 'tmp/**/*.html',
        tmp: 'tmp',
        dist: 'dist'
    }
};

/* ------------------------- *
 *          FILES
 * ------------------------- */

// Copy: Images
gulp.task('copy:images', function() {
 return gulp.src(paths.img.src)
    .pipe(gulp.dest(paths.img.tmp));
});

// Copy: Static files
gulp.task('copy:statictmp', function() {
 return gulp.src(paths.static.src)
    .pipe(gulp.dest(paths.static.tmp));
});

// Copy: Static files
gulp.task('copy:staticdist', function() {
 return gulp.src(paths.static.src)
    .pipe(gulp.dest(paths.static.dist));
});

// Copy: Dependencies
gulp.task('copy:vendor', function() {
  return gulp.src(npmdist({ copyUnminified: true}), {base:'./node_modules'})
    .pipe(gulp.dest('tmp/vendor'));
});

// Compress: Images
gulp.task('compress:images', function() {
  gulp.src(paths.img.src)
    .pipe(imagemin({verbose: true}))
    .pipe(gulp.dest(paths.img.dist))
});

gulp.task('files', ['copy:images', 'copy:statictmp', 'copy:staticdist', 'copy:vendor', 'compress:images']);

/* ------------------------- *
 *       PREPROCESSING
 * ------------------------- */

// Compile Sass
gulp.task('compile:sass', function(){
  return gulp.src(paths.styles.src)
		.pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ]))
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.tmp))
    .pipe(browsersync.stream());
});

// Compile Js
gulp.task('compile:js', ['copy:vendor'], function() {
  return gulp.src(paths.js.src)
		.pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env']
    }))
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.js.tmp))
    .pipe(browsersync.stream());
});

// Compile Pug
gulp.task('compile:pug', function(){
  return gulp.src(paths.views.src)
    .pipe(pug())
    .pipe(htmlbeautify({indent_size: 2}))
    .pipe(gulp.dest(paths.html.tmp))
    .pipe(browsersync.stream());
});

gulp.task('pug', ['compile:sass', 'compile:js', 'compile:pug']);

/* ------------------------- *
 *     LOCAL DEVELOPMENT
 * ------------------------- */

// Start server and watch for changes
gulp.task('serve', ['copy:images', 'copy:statictmp', 'copy:vendor', 'pug'], function() {
  browsersync.init({
    server: paths.server
  });
  gulp.watch(paths.styles.src, ['compile:sass']);
  gulp.watch('src/views/**/*.pug', ['compile:pug']);
  gulp.watch(paths.js.src, ['compile:js']);
  gulp.watch(paths.styles.src).on('change', browsersync.reload);
  gulp.watch(paths.html.src).on('change', browsersync.reload);
  gulp.watch(paths.js.src).on('change', browsersync.reload);
});

/* ------------------------- *
 *     PRODUCTION BUILD
 * ------------------------- */

// Build files for production
// Concat using useref
gulp.task('build:files', ['files', 'pug'], function () {
    return gulp.src(paths.html.src)
      .pipe(useref({searchPath: 'tmp'}))
      .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
     	.pipe(gulpif('*.js', uglify()))
     	.pipe(gulpif('*.css', cleancss()))
      .pipe(gulp.dest(paths.html.dist));
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
 *         DEFAULT
 * ------------------------- */

// Default task runner
gulp.task('default', ['serve']);
