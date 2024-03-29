var gulp           = require('gulp'),
    rename         = require('gulp-rename'),
    less           = require('gulp-less'),
    changed        = require('gulp-changed'),
    react          = require('gulp-react'),
    reactify       = require('reactify'),
    browserify     = require('gulp-browserify'),
    mainBowerFiles = require('main-bower-files'),
    del            = require('del');

var paths = {
  webpages: {
    src: ['./src/**/*.html', './src/**/*.php'],
    dest: './dist'
  },
  js: {
    src: './src/js/**/*.js',
    dest: './dist/js'
  },
  jsx: {
    src: './src/js/**/*.jsx',
    dest: './dist/js'
  },
  less: {
    src: './src/css/*',
    dest: './dist/css'
  },
  lib: {
    src: mainBowerFiles().concat(
      'node_modules/react/dist/*.js',
      'node_modules/react-dom/dist/*.js',
      'node_modules/react-highcharts/dist/bundle/highcharts.js',
      'node_modules/requirejs/require.js'
    ),
    dest: './dist/lib'
  },
  fonts: {
    src: 'bower_components/semantic/src/themes/default/**',
    dest: './dist/lib'
  },
  static: {
    src: './src/static/*',
    dest: './dist/static'
  }
};

gulp.task('clean', function(callback) {
  del(['dist', '!dist/lib'], callback);
});

gulp.task('web-pages', function() {
  return gulp.src(paths.webpages.src, {base: './src'})
    .pipe(changed(paths.webpages.dest))
    .pipe(gulp.dest(paths.webpages.dest));
});

gulp.task('Javascript', function() {
  return gulp.src(paths.js.src)
    .pipe(changed(paths.js.dest))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('React', function() {
  return gulp.src(paths.jsx.src)
    .pipe(changed(paths.jsx.dest))
    .pipe(react())
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('Less', function() {
  return gulp.src(paths.less.src)
    .pipe(changed(paths.less.dest))
    .pipe(less())
    .pipe(gulp.dest(paths.less.dest));
});

gulp.task('libs', function() {
  return gulp.src(paths.lib.src)
    .pipe(changed(paths.lib.dest))
    .pipe(gulp.dest(paths.lib.dest));
});

gulp.task('material-ui', function() {
    return gulp.src('node_modules/material-ui/lib/**')
      .pipe(changed('dist/lib/material-ui'))
      .pipe(gulp.dest('dist/lib/material-ui'));
});

gulp.task('libs-fonts', function() {
  return gulp.src(paths.fonts.src, { base: './bower_components/semantic/src' })
    .pipe(changed(paths.fonts.dest))
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('browserify', function() {
  gulp.src('src/js/result.jsx')
    .pipe(changed('dist/js'))
    .pipe(react())
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production,
      transform: [reactify]
    }))
    .pipe(gulp.dest('dist/js'))
  ;
});

gulp.task('static', function() {
  return gulp.src(paths.static.src)
    .pipe(changed(paths.static.dest))
    .pipe(gulp.dest(paths.static.dest));
});

gulp.task('default', ['web-pages', 'Javascript', 'React', 'Less', 'libs', 'browserify', 'static']);
