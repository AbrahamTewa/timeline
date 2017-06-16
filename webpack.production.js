/* eslint-env node, webpack */

import path from 'path';

export default { devtool : 'source-map'
               , entry   : ['./src/script/index.js']
               , output  : { path: path.resolve(__dirname, 'build')
                           , filename: 'index.js'
                           , publicPath: '/'}
               , resolve : { modules: ['node_modules']}
               , module  : { rules: [{ test   : /\.js$/
                                     , include: [path.resolve(__dirname), 'src']
                                     , exclude: /node_modules/
                                     , loader : 'babel-loader'}]}};
