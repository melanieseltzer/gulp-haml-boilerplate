# Gulp Haml Boilerplate
[![dependencies Status](https://david-dm.org/melanieseltzer/gulp-haml-boilerplate/status.svg)](https://david-dm.org/melanieseltzer/gulp-haml-boilerplate) [![devDependencies Status](https://david-dm.org/melanieseltzer/gulp-haml-boilerplate/dev-status.svg)](https://david-dm.org/melanieseltzer/gulp-haml-boilerplate?type=dev)

My personal front-end Gulp workflow for Haml and Sass. A simple boilerplate to get you up and running quickly. Uses BrowserSync for live-reloading in the browser. Less refreshing, more coding! :fire:

## Thanks :+1:

This boilerplate uses:

- [Node.js](https://nodejs.org/en/)
- [Gulp 3](https://gulpjs.com/)
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

Set your base path in the Gulpfile, if deploying to Github Pages:

```
var base = {
  // Your Github pages base URL
  // Same name as your repo
  url: '/gulp-haml-boilerplate/'
}

```

## Task runners

Serve locally from `build`. BrowserSync watches for changes in `src` and automatically reloads the browser:

```
gulp serve
```

Build the `dist` directory for deployment:

```
gulp build
```

Deploy `dist` directory to GitHub Pages (gh-pages branch):

```
gulp deploy
```

Delete `build` and `dist` folders for easy cleanup:

```
gulp clean (both)
gulp clean:build
gulp clean:dist
```

## Folder Structure

Develop your site in the `src` directory. You can choose to commit `build` or `dist` folders by removing them from .gitignore (up to you).

```
gulp-haml-boilerplate/
|—— build/
|   |—— assets/
|   |   |—— fonts/
|   |   |   |—— # font files
|   |   |—— img/
|   |   |   |—— # unoptimized images
|   |—— css/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— styles.css
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
|—— dist/
|   |—— assets/
|   |   |—— fonts/
|   |   |   |—— # font files
|   |   |—— img/
|   |   |   |—— # optimized images
|   |—— css/
|   |   |—— all.min.css (packaged and minified)
|   |—— js/
|   |   |—— all.min.js (packaged and minified)
|   |—— test-directory/
|   |   |—— index.html
|   |—— index.html
|—— src/
|   |—— assets/
|   |   |—— fonts/
|   |   |   |—— # font files
|   |   |—— img/
|   |   |   |—— # unoptimized images
|   |—— haml/
|   |   |—— partials/
|   |   |   |—— _footer.haml
|   |   |   |—— _head.haml
|   |   |   |—— _header.haml
|   |   |—— test-directory/
|   |   |   |—— index.haml
|   |   |—— index.haml
|   |—— js/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— all.js (your custom js)
|   |—— sass/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— all.scss (your custom sass)
|—— .gitignore
|—— gulfile.js
|—— package.json
|—— README.md
```

## Configurable Options

If you plan to publish to Github pages, you will need to do a base path declaration. This is because Github Pages serves files from a folder named after your repo (e.g. https://username.github.io/reponame/) instead of root (https://username.github.io).

Add your repo name to this variable in the gulpfile (keep the two slashes intact).

```
var base = {
  url: '/REPONAMEHERE/'
}
```

Set your paths. You can modify depending on your workflow/naming conventions.

```
var paths = {
    server: 'build',
    assets: {
        src: 'src/assets/**/*',
        build: 'build/assets',
        dist: 'dist/assets'
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
