# starter.reactjs
A starter for developing react project.

## Tools configured

- [Babel (ES2015)](http://babeljs.io/)
- [EditorConfig](http://editorconfig.com/)
- [ESLint](http://eslint.org/)
- [Grunt](http://gruntjs.com/)
- [Plato](https://github.com/es-analysis/plato)
- Source maps (for both javascript and css)

### Todo
- [Istanbul](https://istanbul.js.org/)
- [Mocha](https://mochajs.org/)
- [jsDoc](http://usejsdoc.org/)

## Usage

``` 
git clone https://github.com/AbrahamTewa/starter.reactjs.git
cd starter.reactjs
npm install
npm run build
```

Then launch the `build/index.html` file in your browser.

## Available commands

#### `npm run analysis`
Run a code analysis using [Plato](https://github.com/es-analysis/plato).
The output result is stored in the `analysis` directory.

### `npm run build`
Run the build of the application.
The builder will create a new folder "build" in which the build will be added.
Note, the build will first lint the source.

### `npm run lint`
Run the linter on the source using [ESLint](http://eslint.org)/.

### `npm run watch`
Will run a watcher that will rebuild the app each time one of these file is modified :

### Todo

### `npm run test-cov`
Run tests with coverage using [Istanbul](https://istanbul.js.org/) and [Mocha](https://mochajs.org/) for test.

Output directory : `coverage`.

### `npm run test`
Run the test using [Mocha](https://mochajs.org/).

### `npm test`
Run the test.
