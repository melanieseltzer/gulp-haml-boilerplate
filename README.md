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

Develop your site in the `src` directory. Production code is built to `dist`.

Dev server runs from `tmp`. It is not intended to be committed to the repo, but you may if you wish. Just make sure to put `vendor` in your `.gitignore` to not commit the vendor code.

```
static-frontend-boilerplate/
|—— dist/
|   |—— css/
|   |   |—— all.min.css (packaged and minified)
|   |—— img/
|   |   |—— # optimized images
|   |—— js/
|   |   |—— all.min.js (packaged and minified)
|   |—— static/
|   |   |—— fonts/
|   |   |—— pdfs/
|   |   |—— etc...
|   |—— test-directory/
|   |   |—— index.html
|   |—— index.html
|—— tmp/
|   |—— css/
|   |   |—— main.css
|   |   |—— main.css.map
|   |—— img/
|   |   |—— # unoptimized images
|   |—— js/
|   |   |—— main.js
|   |   |—— main.js.map
|   |—— static/
|   |   |—— fonts/
|   |   |—— pdfs/
|   |   |—— etc...
|   |—— test-directory/
|   |   |—— index.html
|   |—— vendor/
|   |   |—— # dependencies from package.json
|   |—— index.html
|—— src/
|   |—— img/
|   |   |—— # unoptimized images
|   |—— js/
|   |   |—— main.js
|   |—— static/
|   |   |—— fonts/
|   |   |—— pdfs/
|   |   |—— etc...
|   |—— styles/
|   |   |—— base/
|   |   |—— components/
|   |   |—— helpers/
|   |   |—— layout/
|   |   |—— pages/
|   |   |—— main.scss
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
|—— .gitignore
|—— gulfile.js
|—— LICENSE
|—— package-lock.json
|—— package.json
|—— README.md
```

## :wrench: Configurable Options

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
```

## :heart: Built With

- [Gulp 3](https://gulpjs.com/)
- [Pug](https://pugjs.org)
- [Sass](http://sass-lang.com/)
- [Babel](https://babeljs.io/)
- [BrowserSync](https://browsersync.io/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
