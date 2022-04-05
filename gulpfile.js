const {src, dest, parallel, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require ('gulp-concat');
const browserSync = require('browser-sync').create();

function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function styles() {
    return src('app/scss/**/**.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('style.min.css'))
        .pipe(dest('./css'))
        .pipe(browserSync.stream())
}

function watching(){
    watch(['app/scss/**/*.scss'], styles) 
    watch(['app/*.html']).on('change', browserSync.reload)
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel('watching', 'browsersync');