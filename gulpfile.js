let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsProject = ts.createProject('tsconfig.json');
let del = require('del');
let sourcemaps = require('gulp-sourcemaps');
let path = require('path');
function removeBuild(){
    return del(['./build/**/*', './map/**/*']);
}

function buildTs(){
    return tsProject.src().pipe(sourcemaps.init()).pipe(tsProject()).js
        .pipe(sourcemaps.mapSources((sourcePath, file) => {
            let unixStylePath = file.relative.split(path.sep).join('/');
            let dirlen = unixStylePath.split('/').length;
            let mypath = `${'../'.repeat(dirlen)}src/${unixStylePath}`.replace(/\.js/g, '.ts');
            console.log('sourcemap ts path ', mypath);
            return mypath;
        }))
        .pipe(sourcemaps.write('../maps')).pipe(gulp.dest('build'));
}

gulp.task('default', gulp.series(removeBuild, buildTs));