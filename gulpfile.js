const {src, dest, parallel, watch} = require('gulp');
const sass        = require('gulp-sass')(require('sass'));
const concat      = require ('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify      = require('gulp-uglify-es').default;

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function scripts(){
    return src([
        'node_modules/jquery/dist/jquery.js',
        'app/js/main.js'
])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles(){
    return src('app/scss/style.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function watching(){
    watch(['app/scss/**/*.scss'], styles) 
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts) 
    watch(['app/*.html']).on('change', browserSync.reload)
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(scripts, browsersync, watching);