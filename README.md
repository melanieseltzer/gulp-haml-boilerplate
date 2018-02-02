# Gulp HAML Boilerplate
A simple front-end Gulp workflow to get you up and coding quickly and painlessly!

## Start

This boilerplate uses:

- [Node.js](https://nodejs.org/en/)
- [Gulp](https://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [Haml](http://haml.info/)
- [Babel](https://babeljs.io/)

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

Build and serve locally

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

Delete `tmp` and `dist` folders for easy cleanup

```
gulp clean (both)
gulp clean:tmp
gulp clean:dist
```

## Folder Structure

Develop your site in the `src` directory. Run `gulp` and your files are compiled to `tmp` and then minified to `dist` for production.

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
|   |—— somedirectory/
|   |   |—— index.html
|   |—— index.html
|—— src/
|   |—— fonts/
|   |   |—— # font files
|   |—— haml/
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
|—— tmp/
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
|   |—— somedirectory/
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
    server: 'tmp',
    images: {
        src: 'src/img/**/*',
        dist: 'dist/img'
    },
    fonts: {
        src: 'src/fonts/**/*',
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
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
