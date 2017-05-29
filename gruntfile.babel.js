// ******************** NodeJS packages ********************
import grunt from 'grunt';

require('load-grunt-tasks')(grunt);

// ******************** Script ********************

const buildConfig = { options:  { browserifyOptions: {debug: true}
                                , transform: [['babelify', {presets: ['es2015', 'react']}]] }
                    , files: { 'build/scripts/index.js' : 'src/client/scripts/index.js' } };

const buildAndWatch = {...buildConfig
                      , watch: true};

grunt.initConfig({

    browserify: { build: buildConfig
                , watch: buildAndWatch
                , watchifyOptions: {delay: 40} }

    , clean: {
        build: ['build'],
        doc : ['doc/']
    }

    , copy: {
        html: {
            files: [{
                expand: true,
                cwd: 'src/client',
                src: 'index.html',
                dest: 'build'
            }]
        },
        vendors: {
            files: [{
                expand: true,
                src: ['vendors/**/*.*'],
                dest: 'build/'
            }]
        }
    }

    , eslint: {
        target: {
            expand: true
          , cwd   : 'src'
          , src   : ['**/*.js']
          , dest  : 'build/'
          , ext   : '.js'}
    }

    , mocha : {
        test: {
            src: ['src\\**\\__test__\\**\\*.js'],
            opts : 'mocha.opts'
        }
    }

    , sass: {
        options: {
            sourceMap: true
        }
      , build: {
          files: { 'build/stylesheets/index.css' : 'src/client/stylesheets/index.scss'}
      }
    }

    , watch: {
        scripts: {
            files: ['src/**/*.*'
                   , 'gruntfile.js'
                   , 'package.json'
                   , '.eslintrc.json']
          , tasks: ['eslint', 'copy', 'browserify:watch', 'sass']
          , options: { atBegin : true
                     , spawn   : false}
        }
    }
});

// Registering all tasks
grunt.registerTask('lint', ['eslint']);
grunt.registerTask('build', ['eslint', 'clean:build', 'copy', 'browserify:build', 'sass']);
grunt.registerTask('default', ['build']);
