'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')
const rollup = require('rollup-stream')
const source = require('vinyl-source-stream')

gulp.task('rollup', () =>
  rollup({
    entry: './src/static/app.js'
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

gulp.task('moveApi', () =>
  gulp.src('./src/api/*')
    .pipe(gulp.dest('./build/api'))
)

gulp.task('moveIndex', () =>
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
)

gulp.task('default', ['babel', 'moveApi', 'moveIndex'] , () => { console.log('Build finished')})
