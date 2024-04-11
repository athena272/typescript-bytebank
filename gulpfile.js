const gulp = require('gulp');
const { watch } = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const distFolder = './dist/';
const cssFolder = `${distFolder}css/`;
const baseCssFolder = `${cssFolder}base/`;
const componentsCssFolder = `${cssFolder}componentes/`;
const jsFolderMin = `${distFolder}js/`;

// minify app css
gulp.task('cssApp', function () {
    console.log("compile cssApp...");
    return gulp.src('css/app.css')
        .pipe(concat('app.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssFolder));
});

// minify base css
gulp.task('cssBase', function () {
    console.log("compile cssBase...");
    return gulp.src('css/base/_base.css')
        .pipe(concat('_base.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(baseCssFolder));
});

// minify form css
gulp.task('cssForm', function () {
    console.log("compile cssForm...");
    return gulp.src('css/base/_form.css')
        .pipe(concat('_form.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(baseCssFolder));
});


// minify normalize css
gulp.task('cssNormalize', function () {
    console.log("compile cssNormalize...");
    return gulp.src('css/base/_normalize.css')
        .pipe(concat('_normalize.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(baseCssFolder));
});

// minify cabecalho css
gulp.task('cssCabecalho', function () {
    console.log("compile cssCabecalho...");
    return gulp.src('css/componentes/_cabecalho.css')
        .pipe(concat('_cabecalho.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(componentsCssFolder));
});

//Minify Home.js
// gulp.task('homeJs', function () {
//     return gulp
//         .src([
//             './wwwroot/js/Home/Home.js',
//         ])
//         .pipe(concat('home.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(jsFolderMin));
// });

//#region LIVE RELOAD
// gulp.task('browser-sync', function () {
//     browserSync.init('./**', {
//         proxy: "https://localhost/"
//     });

//     gulp.watch('styles/*.scss').on('change', browserSync.reload);
// });
//#endregion

//#region Tasks
// estrutura basica = gulp.task("NomeDaTarefa", function(){...})
// src = diretorio do scss a ser compilado
// pipe = cria ação na compilação
// sass().on = fica "observando" o sass caso haja erro e apresentado
// gulp.dest = caminho onde sera salvo o arquivo css já compilado

//#endregion

//  coloca as "tasks" em um array chamado "buildsass"
gulp.task('buildcss', gulp.series(
    'cssApp',
    'cssBase',
    'cssForm',
    'cssNormalize',
    'cssCabecalho',
));

// gulp.task('buildjs', gulp.series(
//     'homeJs',
// ));

//  cria o comando "gulp watch" que fica observando o array de taks
// exports.watch = function () {
//     watch('styles/*.scss', gulp.series('buildsass'));//Verifica arquivos principais
// };
