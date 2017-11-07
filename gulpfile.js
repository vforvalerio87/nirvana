'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const rollup = require('rollup-stream')
const source = require('vinyl-source-stream')
const browserSync = require('browser-sync')

gulp.task('moveApi', () =>
  gulp.src('./src/api/*')
    .pipe(gulp.dest('./build/api'))
)

gulp.task('moveIndex', () =>
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
)

gulp.task('rollup', ['moveApi', 'moveIndex'], () =>
  rollup({
    input: './src/static/app.js',
    format: 'cjs'
  })
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/static'))
)

gulp.task('babel', ['rollup'] , () =>
  gulp.src('./build/static/app.js')
    .pipe(babel(
      {
        presets: ['babili']
      }
    ))
)

gulp.task('serve', () => {
  browserSync({
    server: './build',
    baseDir: './',
    port: 8080,
    notify: false
  })
})

gulp.task('watch', () => {
  gulp.watch('./src/static/*.js', ['babel'])
  gulp.watch('./build/static/app.js').on('change', browserSync.reload)
})

gulp.task('default', ['serve', 'watch'], () => { console.log('Build finished')})
