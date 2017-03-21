'use strict'

const gulp = require('gulp')
const babel = require('gulp-babel')

gulp.task('build', () =>
  gulp.src('./src/static/app.js')
    .pipe(babel(
      {
        presets: ['babili']
      }
    ))
    .pipe(gulp.dest('./build/static'))
)

gulp.task('moveApi', () =>
  gulp.src('./src/api/*')
    .pipe(gulp.dest('./build/api'))
)

gulp.task('moveIndex', () =>
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
)

gulp.task('default', ['build', 'moveIndex'], () => { console.log('Build finished')})
