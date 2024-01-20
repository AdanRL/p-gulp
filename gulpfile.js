import gulp from 'gulp';
import concat from 'gulp-concat-css';
import minify from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';

gulp.task('concatCSS', () => {
  return gulp.src(['src/styles/style1.css', 'src/styles/style2.css'])
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('minifyCSS', () => {
  return gulp.src('dist/styles/styles.css')
    .pipe(minify())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('sourcemaps', () => {
  return gulp.src('dist/styles/styles.css')
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('minifyImages', () => {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

gulp.task('minifyJS', () => {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// gulp.task('default', gulp.series('concatCSS', 'minifyCSS', 'sourcemaps', 'minifyJS'));

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch('src/css/*.css', gulp.series('concatCSS', 'minifyCSS', 'sourcemaps')).on('change', browserSync.reload);
  gulp.watch('src/js/*.js', gulp.series('minifyJS')).on('change', browserSync.reload);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('concatCSS', 'minifyCSS', 'sourcemaps', 'minifyImages', 'minifyJS', 'browserSync'));

// gulp.watch('src/styles/*.css', gulp.series('concatCSS')).on('change', browserSync.reload);
