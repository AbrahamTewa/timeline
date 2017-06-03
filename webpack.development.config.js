import path from 'path';

let config;
let rules;

rules = [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }];

config = { entry   : './src/scripts/index.js'
         , output  : { filename: 'index.js'
                     , path: path.resolve(__dirname, 'docs/scripts')}
         , module  : {rules}};

export default config;
