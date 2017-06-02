// ******************** NodeJS packages ********************
import grunt from 'grunt';

require('load-grunt-tasks')(grunt);

const BUILD_FOLDER = 'docs';

// ******************** Script ********************

const buildConfig = { options:  { browserifyOptions: {debug: true}
                                , transform: [['babelify', {presets: ['es2015', 'react']}]] }
                    , files: { } };

buildConfig.files[`${BUILD_FOLDER}/scripts/index.js`] =  'src/scripts/index.js';

const buildAndWatch = {...buildConfig
                      , watch: true};

let tasks = {

    browserify: { build: buildConfig
                , watch: buildAndWatch
                , watchifyOptions: {delay: 40} }

    , clean: {
        build  : [BUILD_FOLDER],
        doc    : ['doc/']}

    , copy: {
        html: {
            files: [{ expand: true
                    , cwd: 'src'
                    , src: 'index.html'
                    , dest: BUILD_FOLDER
            }]
        },
        vendors: {
            files: [{ expand: true
                    , src: ['vendors/**/*.*']
                    , dest: `${BUILD_FOLDER}/`}]
        }
    }

    , eslint: {
        target: {
            expand: true
          , cwd   : 'src'
          , src   : ['**/*.js']
          , dest  : `${BUILD_FOLDER}/`
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
          files: {}
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
        },
        stylesheets: {
            files: ['src/**/*.scss']
          , tasks: ['sass']
          , options: { atBegin : true
                     , spawn   : false}
        }
    }
};

{
    const STYLESHEET_FOLDER = `${BUILD_FOLDER}/stylesheets`;
    tasks.sass.build.files[`${STYLESHEET_FOLDER}/index.css`] = 'src/stylesheets/index.scss';
    tasks.sass.build.files[`${STYLESHEET_FOLDER}/theme-future.css`] = 'src/stylesheets/theme-future.scss';
}

grunt.initConfig(tasks);

// Registering all tasks
grunt.registerTask('lint', ['eslint']);

grunt.registerTask('build', ['eslint'
                            ,'clean:build'
                            ,'copy:html'
                            ,'copy:vendors'
                            ,'browserify:build'
                            ,'sass']);

grunt.registerTask('default', ['build']);
