# Gulp Haml Boilerplate
My personal front-end Gulp workflow for Haml and Sass. A simple boilerplate to get you up and running quickly. Uses BrowserSync for live-reloading in the browser. Less refreshing, more coding! :fire:

## Thanks :+1:

This boilerplate uses:

- [Node.js](https://nodejs.org/en/)
- [Gulp](https://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [Haml](http://haml.info/)
- [Babel](https://babeljs.io/)
- [BrowserSync](https://browsersync.io/)

## Start

Clone repo and cd into project directory:

```
git clone git@github.com:melanieseltzer/gulp-haml-boilerplate.git
cd gulp-haml-boilerplate
```

Install dependencies:

```
npm install
```

## Task runners

Run everything and serve locally from `build`. BrowserSync watches for changes in `src` and automatically reloads the browser.

```
gulp serve
```

Build the `dist` directory for deployment

```
gulp build
```

Deploy `dist` directory to GitHub Pages (gh-pages branch)

```
gulp deploy
```

Delete `build` and `dist` folders for easy cleanup

```
gulp clean (both)
gulp clean:build
gulp clean:dist
```

## Folder Structure

Develop your site in the `src` directory. Run `gulp build` and your files are compiled to `build` and then minified to `dist` for production.

```
gulp-haml-boilerplate/
|—— dist/
|   |—— css/
|   |   |—— all.min.css (packaged and minified)
|   |—— fonts/
|   |   |—— # font files
|   |—— img/
|   |   |—— # optimized images
|   |—— js/
|   |   |—— all.min.js (packaged and minified)
|   |—— test-directory/
|   |   |—— index.html
|   |—— index.html
|—— src/
|   |—— fonts/
|   |   |—— # font files
|   |—— haml/
|   |   |—— partials/
|   |   |   |—— _footer.haml
|   |   |   |—— _head.haml
|   |   |   |—— _header.haml
|   |   |—— test-directory/
|   |   |   |—— index.haml
|   |   |—— index.haml
|   |—— img/
|   |   |—— # un-optimized images
|   |—— js/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— all.js (your custom js)
|   |—— sass/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— all.scss (your custom sass)
|—— build/
|   |—— css/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— styles.css
|   |—— fonts/
|   |   |—— # font files
|   |—— img/
|   |   |—— # optimized images
|   |—— js/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— app.js
|   |—— partials/
|   |   |—— _footer.html
|   |   |—— _head.html
|   |   |—— _header.html
|   |—— test-directory/
|   |   |—— index.html
|   |—— index.html
|—— .gitignore
|—— gulfile.js
|—— package.json
|—— README.md
```

## Configurable Options

Set your paths. You can modify depending on your workflow/naming conventions.

```
var paths = {
    server: 'build',
    images: {
        src: 'src/img/**/*',
        build: 'build/img',
        dist: 'dist/img'
    },
    fonts: {
        src: 'src/fonts/**/*',
        build: 'build/fonts',
        dist: 'dist/fonts'
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
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
