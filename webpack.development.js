/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env node */

// ============================================================
// Import packages
import path from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

// ============================================================
// Module constants and variables
const styleLintOptions = { configFile: '.stylelintrc' };

const BUILD_FOLDER = path.resolve(__dirname, 'build');
const SOURCE_FOLDER = path.resolve(__dirname, 'src');

// ============================================================
// Exports
export default {
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: false,
        historyApiFallback: true,
        publicPath: '/',
    },
    entry: [
        './src/index.js',
        './src/index.scss',
    ],
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.jsx?$/,
                include: SOURCE_FOLDER,
                exclude: /node_modules/,
                use: ['eslint-loader'],
            },
            {
                test: /\.jsx?$/,
                include: [SOURCE_FOLDER],
                exclude: /node_modules/,
                loader: 'babel-loader',
            },

            // Stylesheets
            {
                test: /\.s[a|c]ss$/,
                include: [SOURCE_FOLDER],
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' }, // creates style nodes from JS strings
                    { loader: 'css-loader' }, // translates CSS into CommonJS
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },

    output: {
        path: BUILD_FOLDER,
        filename: 'index.js',
    },
    plugins: [
        new StyleLintPlugin(styleLintOptions),
        new HtmlWebpackPlugin(),
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: [
            '.js',
            '.jsx',
        ],
    },
};
