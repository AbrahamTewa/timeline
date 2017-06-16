/* eslint-env es5,node */

require('babel-register');

let config;

if (process.env.NODE_ENV === 'production')
    config = require('./webpack.production').default;
else
    config = require('./webpack.development').default;

module.exports = config;
