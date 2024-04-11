const gulp = require('gulp');
const { watch } = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const distFolder = './dist/';
const cssFolder = `${distFolder}css/`;
const jsFolderMin = `${distFolder}js/`;

// minify app css
gulp.task('cssApp', function () {
    console.log("compile cssApp...");
    return gulp.src('css/app.css')
        .pipe(concat('app.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssFolder));
});

// minify home scss
gulp.task('sassHome', function () {
    console.log("compile sassHome...");
    return gulp.src('styles/home.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(concat('home.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssFolder));
});

// minify login scss
gulp.task('sassLogin', function () {
    console.log("compile sassLogin...");
    return gulp.src('styles/login.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(concat('login.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssFolder));
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
));

// gulp.task('buildjs', gulp.series(
//     'homeJs',
// ));

//  cria o comando "gulp watch" que fica observando o array de taks
// exports.watch = function () {
//     watch('styles/*.scss', gulp.series('buildsass'));//Verifica arquivos principais
// };
