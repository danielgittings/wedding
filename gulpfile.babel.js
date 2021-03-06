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
    dest: 'build/assets/styles/',
  },
  scripts: {
    src: 'src/assets/scripts/**/*.js',
    dest: 'build/assets/scripts/',
  },
  markup: {
    src: 'src/**/*.{html,ico}',
    dest: 'build',
  },
  images: {
    src: 'src/assets/img/*',
    dest: 'build/assets/img/',
  },
};

function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './build',
    },
  });
  done();
}

export const clean = () => del(['build']);

export function scripts() {
  return gulp
    .src([
      'src/assets/scripts/libs/polyfill.js',
      'src/assets/scripts/libs/find-poly.js',
      'src/assets/scripts/libs/smoothscroll.min.js',
      // 'src/assets/scripts/libs/anime.min.js',
      'src/assets/scripts/main.js',
    ])
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

export function styles() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(cleanCSS())
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      // pass in options to the stream
      .pipe(rename({
        basename: 'main',
        suffix: '.min',
      }))
      .pipe(gulp.dest(paths.styles.dest))
  );
}

export function markup() {
  return gulp.src(paths.markup.src).pipe(gulp.dest(paths.markup.dest));
}

export function images() {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo(),
    ]))
    .pipe(gulp.dest(paths.images.dest));
}

export function watch() {
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
  gulp.watch(paths.markup.src, gulp.series(markup, reload));
  gulp.watch(paths.images.src, gulp.series(images, reload));
}

const dev = gulp.series(clean, gulp.parallel(scripts, styles, markup, images), serve, watch);

export const build = gulp.series(clean, gulp.parallel(scripts, styles, markup, images));

export default dev;
