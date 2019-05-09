/* eslint-disable import/no-extraneous-dependencies */
// ============================================================
// Import packages
const path = require('path');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const sass = require('gulp-sass');

const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

// ============================================================
// Module's constants and variables
const DIST_FOLDER_PATH = './build';
const DOC_FOLDER_PATH = './doc';
const REPORT_FOLDER_PATH = './reports';

const COVERAGE_REPORT_FOLDER_PATH = path.resolve(REPORT_FOLDER_PATH, 'tests', 'unit', 'coverage');
const JSDOC_FOLDER_PATH = path.resolve(DOC_FOLDER_PATH, 'jsdoc');
const STORYBOOK_FOLDER_PATH = path.resolve(DOC_FOLDER_PATH, 'storybook');

// ============================================================
// Simple tasks

// ==============================
// Clean
gulp.task('clean:build', () => del([
    DIST_FOLDER_PATH,
]));

gulp.task('clean:doc', () => del([
    DOC_FOLDER_PATH,
]));

gulp.task('clean:doc:jsdoc', () => del([
    JSDOC_FOLDER_PATH,
]));

gulp.task('clean:doc:storybook', () => del([
    STORYBOOK_FOLDER_PATH,
]));

gulp.task('clean:report:coverage', () => del([
    COVERAGE_REPORT_FOLDER_PATH,
]));

gulp.task('clean:reports', () => del([
    REPORT_FOLDER_PATH,
]));

// ==============================
// Build tasks
gulp.task('build:copy:html', () => gulp.src('src/**/*.htm?(l)')
    .pipe(gulp.dest(DIST_FOLDER_PATH)));

// ==============================
// Minify task

gulp.task('minify:css', () => gulp.src(path.resolve(DIST_FOLDER_PATH, '**', '*.css'))
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_FOLDER_PATH)));

// ==============================
// Transpilation tasks

gulp.task('transpile:sass', () => gulp.src('./src/**/*.@(sass|scss)')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(DIST_FOLDER_PATH)));

// ============================================================
// Composed tasks

gulp.task('prepare:build', gulp.series(
    'clean:build',
    gulp.parallel(
        'build:copy:html',
        'transpile:sass',
    ),
    'minify:css',
));

gulp.task(
    'clean',
    gulp.parallel(
        'clean:build',
        'clean:doc',
        'clean:reports',
    ),
);
