import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import del from 'del';
import autoprefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import sourcemaps from 'gulp-sourcemaps';

const server = browserSync.create();

const paths = {
  styles: {
    src: 'src/assets/styles/**/*.scss',
    dest: 'build/assets/styles/'
  },
  scripts: {
    src: 'src/assets/scripts/**/*.js',
    dest: 'build/assets/scripts/'
  },
  markup: {
    src: 'src/**/*.html',
    dest: 'build'
  },
  images: {
    src: 'src/assets/img/**/*.{jpg, jpeg, png}',
    dest: 'build/assets/img/'
  }
};

const supported_browsers = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './build'
    }
  });
  done();
}

export const clean = () => del(['build']);

export function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(autoprefixer({
      browsers: supported_browsers
    }))
    .pipe(sourcemaps.write())
    // pass in options to the stream
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

export function markup() {
  return gulp.src(paths.markup.src)
    .pipe(gulp.dest(paths.markup.dest));
}

export function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(paths.images.dest))
}

export function watch() {
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
  gulp.watch(paths.markup.src, gulp.series(markup, reload));
  gulp.watch(paths.images.src, gulp.series(images, reload));
}

const dev = gulp.series(clean, gulp.parallel(scripts, styles, markup, images), serve, watch);

export default dev;