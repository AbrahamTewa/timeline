/* eslint-env node, webpack */

import path from 'path';

export default {
    devtool: 'source-map',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        publicPath: '/',
    },
    resolve: {
        modules: ['node_modules'],
        extensions: [
            '.js',
            '.jsx',
        ],
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: [path.resolve(__dirname), 'src'],
            exclude: /node_modules/,
            loader: 'babel-loader',
        }],
    },
};
