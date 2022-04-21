const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');

// Sass Task
function scssTask(){
  return src('src/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// TypeScript Task
function tsTask(){
  return src('src/index.ts', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Watch Task
function watchTask(){
  watch(['src/scss/**/*.scss', 'src/ts/**/*.ts'], series(scssTask, tsTask));
}

// Default Gulp task
exports.default = series(
  scssTask,
  tsTask,
  watchTask
);