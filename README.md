# Static Frontend Boilerplate
[![dependencies Status](https://david-dm.org/melanieseltzer/static-frontend-boilerplate/status.svg)](https://david-dm.org/melanieseltzer/static-frontend-boilerplate) [![devDependencies Status](https://david-dm.org/melanieseltzer/static-frontend-boilerplate/dev-status.svg)](https://david-dm.org/melanieseltzer/static-frontend-boilerplate?type=dev) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/melanieseltzer/static-frontend-boilerplate/issues)

An easy starter boilerplate for static websites, to get you up and coding quickly. Uses Gulp and BrowserSync for local development, Sass for preprocessing, and Pug for templating :fire:

## :point_right: Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installing

Clone repo and cd into project directory:

```
git clone git@github.com:melanieseltzer/static-frontend-boilerplate.git
cd static-frontend-boilerplate
```

Install dependencies:

```
npm install
```

## :rocket: Commands

Serve locally from `tmp`. BrowserSync watches for changes in `src` and automatically reloads the browser:

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

Delete `tmp` and `dist` folders for easy cleanup:

```
gulp clean (both)
gulp clean:tmp
gulp clean:dist
```

## :file_folder: Folder Structure

Develop your site in the `src` directory. Production code is built to `dist`. Dev server runs from `tmp`. It is not intended to be committed to the repo (it's deleted automatically on production build), but commit it if you wish.

```
static-frontend-boilerplate/
|—— dist/
|   |—— assets/
|   |   |—— img/
|   |   |   |—— # optimized images
|   |   |—— fonts/
|   |   |—— pdfs/
|   |   |—— etc...
|   |—— css/
|   |   |—— all.css (packaged and minified)
|   |   |—— all.css.gz (gzip compression)
|   |—— js/
|   |   |—— all.js (packaged and minified)
|   |   |—— all.js.gz (gzip compression)
|   |—— test-directory/
|   |   |—— index.html
|   |   |—— index.html.gz (gzip compression)
|   |—— index.html
|   |—— index.html.gz (gzip compression)
|—— src/
|   |—— assets/
|   |   |—— img/
|   |   |   |—— # unoptimized images
|   |   |—— fonts/
|   |   |—— pdfs/
|   |   |—— etc...
|   |—— js/
|   |   |—— all.js
|   |—— styles/
|   |   |—— base/
|   |   |—— components/
|   |   |—— helpers/
|   |   |—— layout/
|   |   |—— pages/
|   |   |—— all.scss
|   |—— views/
|   |   |—— includes/
|   |   |   |—— _footer.pug
|   |   |   |—— _header.pug
|   |   |   |—— _scripts.pug
|   |   |   |—— _styles.pug
|   |   |—— layouts/
|   |   |   |—— _default.pug
|   |   |—— test-directory/
|   |   |   |—— index.pug
|   |   |—— index.pug
|—— tmp/
|   |—— assets/
|   |   |—— img/
|   |   |   |—— # unoptimized images
|   |   |—— fonts/
|   |   |—— pdfs/
|   |   |—— etc...
|   |—— css/
|   |   |—— all.css
|   |   |—— all.css.map
|   |—— js/
|   |   |—— all.js
|   |   |—— all.js.map
|   |—— test-directory/
|   |   |—— index.html
|   |—— index.html
|—— .gitignore
|—— gulfile.js
|—— LICENSE
|—— package-lock.json
|—— package.json
|—— README.md
```

## :wrench: Configurable Options

Set your paths. You can modify depending on your workflow/naming conventions.

```
var paths = {
  vendor: {
    css: [
      './node_modules/normalize.css',
      './node_modules/bootstrap/dist/css',
      etc...
    ],
    js: [
      './node_modules/jquery/dist',
      './node_modules/popper.js/dist/umd',
      './node_modules/bootstrap/dist/js',
      etc...
    ]
  },
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
```

## :heart: Built With

- [Gulp 3](https://gulpjs.com/)
- [Pug](https://pugjs.org)
- [Sass](http://sass-lang.com/)
- [Babel](https://babeljs.io/)
- [BrowserSync](https://browsersync.io/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
