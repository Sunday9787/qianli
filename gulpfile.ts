import gulp, { type TaskFunction } from 'gulp'
import stylus from 'gulp-stylus'
import sourcemap from 'gulp-sourcemaps'
import replace from 'gulp-replace'
import postcss from 'gulp-postcss'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import gulpIf from 'gulp-if'
import path from 'path'

export function css() {
  return gulp
    .src('./frontend/style/**/*.styl')
    .pipe(sourcemap.init())
    .pipe(replace('$/', path.join(__dirname, './node_modules/')))
    .pipe(stylus({ 'include css': true }))
    .pipe(postcss())
    .pipe(sourcemap.write())
    .pipe(gulp.dest('./public/css'))
}

export function upload() {
  return gulp.src('./frontend/upload/**/*').pipe(gulp.dest('./public/upload'))
}

export function image() {
  return gulp.src('./frontend/image/**/*').pipe(gulp.dest('./public/image'))
}

export function js() {
  return gulp
    .src('./frontend/js/**')
    .pipe(sourcemap.init())
    .pipe(babel())
    .pipe(sourcemap.write())
    .pipe(
      gulpIf(function (file) {
        return !/\.min\.js$/.test(file.basename)
      }, uglify())
    )
    .pipe(gulp.dest('./public/js'))
}

export function lib() {
  return gulp.src('./frontend/lib/**/*').pipe(gulp.dest('./public/lib'))
}

export function watch() {
  gulp.watch('./frontend/style/**/*.styl', { delay: 200 }, gulp.parallel([css]))
  gulp.watch('./frontend/image/**/*', { delay: 200 }, gulp.parallel([image]))
  gulp.watch('./frontend/js/**/*', { delay: 200 }, gulp.parallel([js]))
  gulp.watch('./frontend/lib/**/*', { delay: 200 }, gulp.parallel([lib]))
  gulp.watch('./frontend/upload/**/*', { delay: 200 }, gulp.parallel([upload]))
}

const task: TaskFunction = gulp.parallel([css, image, lib, js, upload])

export default task
