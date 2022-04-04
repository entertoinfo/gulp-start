const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');

function defaultTask(cb) {
    return src('app/scss/**.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css'));
}

exports.default = defaultTask