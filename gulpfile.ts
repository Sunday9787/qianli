import gulp, { TaskFunction } from 'gulp';
import stylus from 'gulp-stylus';
import sourcemap from 'gulp-sourcemaps';
import replace from 'gulp-replace';
import postcss from 'gulp-postcss';
import path from 'path';

export function css() {
  return gulp
    .src('./frontend/styles/**/*.styl')
    .pipe(sourcemap.init())
    .pipe(replace('$/', path.join(__dirname, './node_modules/')))
    .pipe(stylus({ 'include css': true }))
    .pipe(postcss())
    .pipe(sourcemap.write())
    .pipe(gulp.dest('./public/css'));
}

export function image() {
  return gulp.src('./frontend/images/**/*').pipe(gulp.dest('./public/images'));
}

export function watch() {
  gulp.watch(
    './frontend/styles/**/*.styl',
    { delay: 200 },
    gulp.parallel([css]),
  );

  gulp.watch('./frontend/images/**/*', { delay: 200 }, gulp.parallel([image]));
}

const task: TaskFunction = gulp.parallel([watch]);

export default task;
