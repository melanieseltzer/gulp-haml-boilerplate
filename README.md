# Gulp HAML Boilerplate
A simple Gulp workflow with Haml templating to get started quickly and painlessly!

## Start

This boilerplate uses:

- [Node.js](https://nodejs.org/en/)
- [Gulp](https://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [Haml](http://haml.info/)

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

Default task to bundle everything and serve locally:

```
gulp
```

Deploy `dist` directory to GitHub Pages (gh-pages branch):

```
gulp deploy
```

Delete `dist` directory for easy cleanup:

```
gulp clean
```

If you need beautified (unminified) version of your html files:

```
gulp html
```

## Folder Structure

Develop your site in the `src` directory. Run `gulp` and your files are compiled to `dist` directory. This folder contains your processed (un-minified) CSS/JS/HTML files, the optimized assets (images), fonts, and also minified/uglified CSS/JS/HTML ready for production.

```
gulp-haml-boilerplate/
|—— dist/
|   |—— css/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— all.css
|   |   |—— all.min.css (packaged and minified)
|   |—— fonts/
|   |   |—— # font files
|   |—— img/
|   |   |—— # optimized image files
|   |—— js/
|   |   |—— vendor/
|   |   |   |—— # your vendor files
|   |   |—— all.js
|   |   |—— all.min.js (packaged and minified)
|   |—— test-directory/
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
|—— .gitignore
|—— gulfile.js
|—— package.json
|—— README.md
```

## Configurable Options

Set your js and sass files and make sure to put them in correct order for concat.

```
var files = {
  js: {
    src: [
      './src/js/vendor/jquery-2.2.4.js',
      './src/js/vendor/bootstrap.js',
      './src/js/all.js']
  },
  sass: {
    src: [
      './src/sass/vendor/bootstrap.scss',
      './src/sass/vendor/font-awesome.scss',
      './src/sass/all.scss']
  }
}
```

Set your paths. You can modify depending on your workflow/naming conventions.

```
var paths = {
    watch: {
      server: './dist/'
    },
    images: {
        input: './src/img/**/*',
        output: './dist/img/'
    },
    fonts: {
        input: './src/fonts/**/*',
        output: './dist/fonts/'
    },
    js: {
        input: './src/js/**/*.js',
        output: './dist/js/'
    },
    css: {
        input: './src/sass/**/*.{scss,sass}',
        output: './dist/css/'
    },
    haml: {
        input: './src/haml/**/*.haml',
        output: './dist/'
    }
};
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
