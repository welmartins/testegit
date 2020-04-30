const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

function compilaSass() {
  return gulp
    .src("assets/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 3 versions"],
        cascade: false,
      })
    )
    .pipe(gulp.dest("assets/css/"))
    .pipe(browserSync.stream());
}

gulp.task("sass", compilaSass);

function gulpJS() {
  return gulp
    .src(["assets/js/scripts/main.js"])
    .pipe(concat("all.min.js"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("assets/js/"))
    .pipe(browserSync.stream());
}

gulp.task("mainjs", gulpJS);

function pluginJS() {
  return gulp
    .src([
      "assets/lib/jquery/jquery.min.js",
      "assets/lib/modernizr/modernizr-2.8.3.min.js",
      "assets/lib/swiper/swiper.min.js",
      "assets/lib/aos/aos.js",
    ])
    .pipe(concat("plugins.js"))
    .pipe(gulp.dest("assets/js/"))
    .pipe(browserSync.stream());
}

function pluginCSS() {
  return gulp
    .src([
      "assets/lib/fontawesome/font-awesome.min.css",
      "assets/lib/swiper/swiper.min.css",
      "assets/lib/aos/aos.css",
    ])
    .pipe(concat("plugins.css"))
    .pipe(gulp.dest("assets/css/"))
    .pipe(browserSync.stream());
}

gulp.task("pluginjs", pluginJS);

gulp.task("plugincss", pluginCSS);

function browser() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
}

gulp.task("browser-sync", browser);

function watch() {
  gulp.watch("assets/scss/*.scss", compilaSass);
  gulp.watch("assets/js/scripts/*.js", gulpJS);
  gulp.watch("assets/lib/**/*.js", pluginJS);
  gulp.watch("assets/lib/**/*.css", pluginCSS);
  gulp.watch(["*.html", "*.php"]).on("change", browserSync.reload);
}

gulp.task("watch", watch);

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "browser-sync",
    "sass",
    "mainjs",
    "pluginjs",
    "plugincss"
  )
);
