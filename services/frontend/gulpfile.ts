import gulp, { type TaskFunction } from 'gulp'
import stylus from 'gulp-stylus'
import sourcemap from 'gulp-sourcemaps'
import replace from 'gulp-replace'
import postcss from 'gulp-postcss'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import gulpIf from 'gulp-if'
import path from 'path'
import rev from 'gulp-rev'

const projectRoot = path.join(process.cwd(), '..', '..')

const output = {
  css: path.join(projectRoot, 'public/css'),
  js: path.join(projectRoot, 'public/js'),
  image: path.join(projectRoot, 'public/image'),
  upload: path.join(projectRoot, 'public/upload'),
  lib: path.join(projectRoot, 'public/lib'),
  backend: path.join(projectRoot, 'packages/backend')
}

export function css() {
  return gulp
    .src('./src/style/**/*.styl')
    .pipe(sourcemap.init())
    .pipe(replace('$/', path.posix.join(__dirname, './node_modules/')))
    .pipe(stylus({ 'include css': true }))
    .pipe(postcss())
    .pipe(sourcemap.write())
    .pipe(rev())
    .pipe(gulp.dest(output.css))
    .pipe(rev.manifest('rev-css-manifest.json', { merge: true }))
    .pipe(gulp.dest(output.backend))
}

export function upload() {
  return gulp.src('./src/upload/**/*').pipe(gulp.dest(output.upload))
}

export function image() {
  return gulp.src('./src/image/**/*').pipe(gulp.dest(output.image))
}

const prod = false

export function js() {
  return gulp
    .src('./src/js/**')
    .pipe(sourcemap.init())
    .pipe(
      babel({
        plugins: ['@babel/plugin-external-helpers']
      })
    )
    .pipe(
      gulpIf(function (file) {
        return prod && !/\.min\.js$/.test(file.basename)
      }, uglify())
    )
    .pipe(sourcemap.write())
    .pipe(rev())
    .pipe(gulp.dest(output.js))
    .pipe(rev.manifest('rev-js-manifest.json', { merge: true }))
    .pipe(gulp.dest('./src'))
}

export function lib() {
  return gulp.src('./src/lib/**/*').pipe(gulp.dest(output.lib))
}

export function watch() {
  gulp.watch('./src/style/**/*.styl', { delay: 200 }, gulp.parallel([css]))
  gulp.watch('./src/image/**/*', { delay: 200 }, gulp.parallel([image]))
  gulp.watch('./src/js/**/*', { delay: 200 }, gulp.parallel([js]))
  gulp.watch('./src/lib/**/*', { delay: 200 }, gulp.parallel([lib]))
  gulp.watch('./src/upload/**/*', { delay: 200 }, gulp.parallel([upload]))
}

const task: TaskFunction = gulp.parallel([css, image, lib, js, upload])

export default task
