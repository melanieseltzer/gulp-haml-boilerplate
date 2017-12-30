# Gulp HAML Boilerplate
:boom: A simple Gulp workflow with HAML to get you started quickly!

## Start

This boilerplate uses [Node.js](https://nodejs.org/en/) and [Gulp](https://gulpjs.com/).

Clone repo and cd into project directory

```
git clone git@github.com:melanieseltzer/gulp-haml-boilerplate.git
cd gulp-haml-boilerplate
```

Install dependencies

```
npm install
```

## Folder Structure

Develop your site in the `src` directory. We use [Sass](http://sass-lang.com/) and [Haml](http://haml.info/) for our preprocessors.

Run Gulp and your files are compiled to `dist` directory. This folder contains your processed (un-minified) CSS/JS/HTML files, the optimized assets (images), fonts, and also minified/uglified CSS/JS/HTML ready for production.

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

## Task runners

Bundle everything and serve locally

``
gulp
``

Deploy `dist` directory to GitHub Pages (gh-pages branch)

``
gulp deploy
``

Delete dist folders for easy cleanup

``
gulp clean
``

## Configurable Options

Tbd...
