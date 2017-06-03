require('babel-register');

module.exports = function(env) {

    if (env === 'production')
        return require('./webpack.production.config');
    else
        return require('./webpack.development.config');
};
