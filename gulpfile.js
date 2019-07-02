let gulp = require('gulp');
let ts = require('gulp-typescript');
let tsProject = ts.createProject('tsconfig.json');
let del = require('del');
let sourcemaps = require('gulp-sourcemaps');
let path = require('path');
let cp = require('child_process');
function removeBuild() {
    return del(['./build/**/*', './map/**/*']);
}

function buildTs() {
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

gulp.task('default', gulp.series(removeBuild, runLint, buildTs));

function runLint(){
    return new Promise(resolve => {
        let process = cp.exec('npm run lint');
        process.on('close', (code) => {
            console.log(`子进程退出码：${code}`);
            resolve(code);
        });
        process.on('error', err => {
            console.log(`子进程运行错误：${err}`);
        });
        process.stdout.on('data', (data) => {
            console.log(`[out] ${data.toString()}`);
        });
        process.stderr.on('data', (data) => {
            console.error(`[err] ${data.toString()}`);
        });
    });
}

gulp.task('watch', function() {
    return gulp.watch('./src/**/*.ts', gulp.series(removeBuild, runLint, buildTs));
});