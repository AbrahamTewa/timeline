# starter.reactjs &middot; [![Build Status](https://travis-ci.org/AbrahamTewa/timeline.svg?branch=master)](https://travis-ci.org/AbrahamTewa/timeline)
Timeline application to handle 

## Philosophy of the starter
I've created this starter very simple: only few lines of codes, just enough to illustrate the usage of react, redux, [jest](https://facebook.github.io/jest) and [storybook](https://storybook.js.org). All the tools around are configured and working.
The goal here is simple: *start immediately to code*. No questions asked. Just coding.

## Content of the starter

### Tools, framework and helpers

- [Babel](http://babeljs.io)
- [EditorConfig](http://editorconfig.com)
- [Enzyme](http://airbnb.io/enzyme)
- [ESLint](http://eslint.org)
- [Jest](https://facebook.github.io/jest)
- [JSDoc](http://usejsdoc.org)
- [json-lint](https://github.com/zaach/jsonlint)
- [Grunt](http://gruntjs.com)
- [Plato](https://github.com/es-analysis/plato)
- [stylelint](https://stylelint.io/)
- [Storybook](https://storybook.js.org)
- [Webpack 2](https://webpack.js.org)

### Directory structure

| Folder             |         Description                  |       
|--------------------|--------------------------------------|
| `build/`           | The build result of your application. See `npm run build` bellow |
| `doc/`             | All generated documentations         |
| `doc/jsdoc`        | Documentation generated by [JSDoc](http://usejsdoc.org). See `npm run doc`. |
| `doc/storybook`    | Documentation generated by [storybook](https://storybook.js.org). See `npm run doc`. |
| `reports/`         | Contain all generated reports |
| `reports/analysis` | Reports generated by [plato](https://github.com/es-analysis/plato) |
| `reports/coverage` | Coverage reports generated by [Jest](https://facebook.github.io/jest) |
| `src/`             | Source of your application           |
| `src/components`   | React components and containers. See *[Usage with React - redux.js.org](http://redux.js.org/docs/basics/UsageWithReact.html)*. |
| `src/containers`   | React components and containers. See *[Usage with React - redux.js.org](http://redux.js.org/docs/basics/UsageWithReact.html)*. |
| `src/redux`        | Redux actions, action creators and reducers. See [Ducs pattern](https://github.com/erikras/ducks-modular-redux).


### Todo
* Add [Selenium](http://www.seleniumhq.org/) for integration tests.
* Add a styleguide generator

## Usage

```bash 
git clone https://github.com/AbrahamTewa/starter.reactjs.git
cd starter.reactjs
npm install
```

**During development:**
```bash
npm run watch
```

**To build for production mode:**
```bash
npm run build
```

**To serve the application (after build)**
```bash
npm start
```

or you can launch the `build/index.html` file in your browser.

## Available commands

### `npm run analysis`
Run a code analysis using [Plato](https://github.com/es-analysis/plato).
The output result is stored in the `reports/analysis` directory.

### `npm run build`
Run the build of the application in production configuration.
The builder will create a new `build/` folder in which the build will be added, along with source maps (js and css).

#### Build steps

1. Lint the repository
    a. [eslint](http://eslint.org/)
    b. [stylelint](https://stylelint.io/) 
    c. [json-lint](https://github.com/zaach/jsonlint)
2. Clean the `build` folder
3. Copy `src/index.html` into the `build` folder
4. Make the build :
    a. Generate CSS files from *.sass
    b. Minify CSS files (using [clean-css](https://github.com/jakubpawlowicz/clean-css))
    c. Generate js files using [webpack](https://webpack.js.org) and minify using [uglify-es](https://github.com/mishoo/UglifyJS2).

### `npm run doc`
Build the documentation of the project :
- [JSDoc](http://usejsdoc.org)
- [Storybook](https://storybook.js.org)

To build individually each project, use on of the following:
* `npm run doc:jsdoc`
* `npm run doc:storybook` 

### `npm run lint`
Running all linters on the source files and the tooling files (e.g `.babelrc`).

The linters are :
* [eslint](http://eslint.org/)
* [stylelint](https://stylelint.io/) 
* [json-lint](https://github.com/zaach/jsonlint)

### `npm start`
Start a simple [express](http://expressjs.com/) server to serve the HTML file.

### `npm test`
Alias: `npm run test`

Execute all unit tests.
Tests use [jest](https://facebook.github.io/jest/) and [enzyme](http://airbnb.io/enzyme/).

### `npm run test-u`
Like `npm test`, but will also update [jest](https://facebook.github.io/jest/) snapshots.

### `npm run test-cov`
The `test-cov` will run tests and coverage.

### `npm run watch`
Will run a [webpack](https://webpack.js.org/) in watch mode to rebuild the app each time a file in the `src` folder is updated.
The [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR) is enabled on javascript and sass files. Before each reloads, [eslint](http://eslint.org/) and [stylelint](https://stylelint.io/) are runned.

### `npm watch:storybook`
Enable [storybook](https://storybook.js.org) development server. The server will watch file modifications and update in real time your
storybook using the [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) mechanism.
Storybook will be served on [`http://localhost:9001`](localhost:9001).
