import babel    from 'rollup-plugin-babel';
import commonJS from 'rollup-plugin-commonjs';
import resolve  from 'rollup-plugin-node-resolve';

let babelConfig;
let commonJSconfig;
let config;

babelConfig    = babel({exclude: 'node_modules/**'});
commonJSconfig = commonJS({include: 'node_modules/**'});

config = { dest     : 'docs/scripts/index.js'
         , entry    : 'src/scripts/main.js'
         , format   : 'iife'
         , plugins  : [resolve()
                      ,babelConfig
                      ,commonJSconfig]
         , sourceMap: true};

export default config;
