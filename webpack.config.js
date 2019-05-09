require('@babel/register');

let config;

if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line global-require
    config = require('./webpack.production').default;
} else {
    // eslint-disable-next-line global-require
    config = require('./webpack.development').default;
}

module.exports = config;
