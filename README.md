# Static Frontend Boilerplate
[![dependencies Status](https://david-dm.org/melanieseltzer/static-frontend-boilerplate/status.svg)](https://david-dm.org/melanieseltzer/static-frontend-boilerplate) [![devDependencies Status](https://david-dm.org/melanieseltzer/static-frontend-boilerplate/dev-status.svg)](https://david-dm.org/melanieseltzer/static-frontend-boilerplate?type=dev) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/melanieseltzer/static-frontend-boilerplate/issues)

An easy starter boilerplate for static websites, to get you up and coding quickly. Uses Gulp/Haml/Sass/BrowserSync :fire:

## Using

- [Node.js](https://nodejs.org/en/)
- [Gulp 3](https://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [Haml](http://haml.info/)
- [Babel](https://babeljs.io/)
- [BrowserSync](https://browsersync.io/)

## Start

Clone repo and cd into project directory:

```
git clone git@github.com:melanieseltzer/static-frontend-boilerplate.git
cd static-frontend-boilerplate
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
  url: '/static-frontend-boilerplate/'
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
static-frontend-boilerplate/
|—— build/
|   |—— css/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— styles.css
|   |—— img/
|   |   |—— # unoptimized images
|   |—— js/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— app.js
|   |—— lib/
|   |   |—— # dependencies from package.json
|   |—— partials/
|   |   |—— _footer.html
|   |   |—— _head.html
|   |   |—— _header.html
|   |—— static/
|   |   |—— fonts/
|   |   |   |—— # font files
|   |   |—— pdfs/
|   |   |—— etc...
|   |—— test-directory/
|   |   |—— index.html
|   |—— index.html
|—— dist/
|   |—— css/
|   |   |—— all.min.css (packaged and minified)
|   |—— img/
|   |   |—— # optimized images
|   |—— js/
|   |   |—— all.min.js (packaged and minified)
|   |—— static/
|   |   |—— fonts/
|   |   |   |—— # font files
|   |   |—— pdfs/
|   |   |—— etc...
|   |—— test-directory/
|   |   |—— index.html
|   |—— index.html
|—— src/
|   |—— haml/
|   |   |—— partials/
|   |   |   |—— _footer.haml
|   |   |   |—— _head.haml
|   |   |   |—— _header.haml
|   |   |—— test-directory/
|   |   |   |—— index.haml
|   |   |—— index.haml
|   |—— img/
|   |   |—— # unoptimized images
|   |—— js/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— app.js (your custom js)
|   |—— sass/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— styles.scss (your custom sass)
|   |—— static/
|   |   |—— fonts/
|   |   |   |—— # font files
|   |   |—— pdfs/
|   |   |—— etc...
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
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
