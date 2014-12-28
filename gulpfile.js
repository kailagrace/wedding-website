var gulp = require('gulp');


var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './build/images';
 
  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


// include plug-ins
var minifyHTML = require('gulp-minify-html');
 
// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = './src/*.html',
      htmlDst = './build';
 
  gulp.src(htmlSrc)
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});

// include plug-ins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
 
// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});


// include plug-ins
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
 
// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./src/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

//gulp-clean
var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('app/tmp', {read: false})
        .pipe(clean());
});


//gulp-sass
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});


//gulp-size
var gulp = require('gulp');
var size = require('gulp-size');

gulp.task('size', function () {
    return gulp.src('fixture.js')
        .pipe(size())
        .pipe(gulp.dest('dist'));
});


// include gulp
var gulp = require('gulp'); 
 
// include plug-ins
var jshint = require('gulp-jshint');
 
// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


//default gulp task
gulp.task('default', ['imagemin', 'size', 'clean', 'sass', 'htmlpage', 'scripts', 'styles'], function() {

	 // watch for HTML changes
  gulp.watch('./src/*.html', function() {
    gulp.run('htmlpage');
  });
 
  // watch for JS changes
  gulp.watch('./src/scripts/*.js', function() {
    gulp.run('jshint', 'scripts');
  });
 
  // watch for CSS changes
  gulp.watch('./src/styles/*.css', function() {
    gulp.run('styles');
  });

});


//load plugins
var gulp             = require('gulp'),
  compass          = require('gulp-compass'),
  autoprefixer     = require('gulp-autoprefixer'),
  minifycss        = require('gulp-minify-css'),
  uglify           = require('gulp-uglify'),
  rename           = require('gulp-rename'),
  concat           = require('gulp-concat'),
  notify           = require('gulp-notify'),
  livereload       = require('gulp-livereload'),
  plumber          = require('gulp-plumber'),
  path             = require('path');
 
//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
  title: 'Gulp',
  icon: path.join(__dirname, 'gulp.png')
};
 
//error notification settings for plumber
var plumberErrorHandler = { errorHandler: notify.onError({
    title: notifyInfo.title,
    icon: notifyInfo.icon,
    message: "Error: <%= error.message %>"
  })
};
 
//styles
gulp.task('styles', function() {
  return gulp.src(['src/scss/**/*.scss'])
    .pipe(plumber(plumberErrorHandler))
    .pipe(compass({
      css: 'html/css',
      sass: 'src/scss',
      image: 'html/images'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('html/css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('html/css'));
});
 
//scripts
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(plumber(plumberErrorHandler))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('html/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('html/js'));
});
 
//watch
gulp.task('live', function() {
  livereload.listen();
 
  //watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);
 
  //watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);
 
  //reload when a template file, the minified css, or the minified js file changes
  gulp.watch('templates/**/*.html', 'html/css/styles.min.css', 'html/js/main.min.js', function(event) {
    gulp.src(event.path)
      .pipe(plumber())
      .pipe(livereload())
      .pipe(notify({
        title: notifyInfo.title,
        icon: notifyInfo.icon,
        message: event.path.replace(__dirname, '').replace(/\\/g, '/') + ' was ' + event.type + ' and reloaded'
      })
    );
  });
});