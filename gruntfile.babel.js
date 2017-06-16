/* eslint-env node */

// ******************** NodeJS packages ********************
import grunt from 'grunt';

require('load-grunt-tasks')(grunt);

// ******************** Script ********************

grunt.initConfig({
    clean: { analysis : ['reports/analysis']
           , build    : ['build/']
           , coverage : ['reports/coverage']
           , jsdoc    : ['doc/jsdoc/']
           , storybook: ['doc/storybook/']}

    , copy: {
        html: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*.htm', '**/*.html'],
                dest: 'build/'
            }]
        }
    },

    cssmin: {
        options: {sourceMap: true},
        target: {
            files: {
                'build/index.css': 'build/index.css'
            }
        }
    }

    , eslint: {
        src: { expand: true
             , cwd   : 'src'
             , src   : ['**/*.js']
             , ext   : '.js'}
      , storybook: { expand: true
                   , cwd   : 'storybook'
                   , src   : ['**/*.js']
                   , ext   : '.js'}
      , tools: ['gruntfile.js'
               ,'gruntfile.babel.js'
               ,'server.js'
               ,'webpack.config.js'
               ,'webpack.development.js'
               ,'webpack.production.js']
    }

    , jsonlint: {
        options: { format: true
                 , indent: 2}
      , src  : { expand: true
               , cwd   : 'src'
               , src   : '**/*.json'}
      , tools: { expand: false
               , cwd   : '.'
               , src   : ['*.json'
                         ,'.*.json'
                         ,'.babelrc']}
    }

    , sass: {
        options: {
            sourceMap: true
        }
        , build: {
            files: { 'build/index.css' : 'src/index.scss'}
        }
    }

    , stylelint: {
        options: {
            configFile: '.stylelintrc.json'
        },
        src: ['src/**/*.{css,scss,sass}']
    }
});

// Registering all tasks
grunt.registerTask('lint', ['eslint', 'stylelint', 'jsonlint']);
grunt.registerTask('pre-build', ['lint', 'clean:build', 'copy:html', 'sass', 'cssmin']);
grunt.registerTask('default', ['build']);
