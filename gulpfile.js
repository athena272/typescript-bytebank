const gulp = require('gulp');
const { watch } = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const distFolder = './dist/';
const cssFolder = `${distFolder}css/`;
const baseCssFolder = `${cssFolder}base/`;
const componentsCssFolder = `${cssFolder}componentes/`;
const jsFolderMin = `${distFolder}js/`;

// const tsProject = ts.createProject('tsconfig.json');

// // minify app css
// gulp.task('cssApp', function () {
//     console.log("compile cssApp...");
//     return gulp.src('css/app.css')
//         .pipe(concat('app.min.css'))
//         .pipe(minifyCSS())
//         .pipe(gulp.dest(cssFolder));
// });

gulp.task('typescriptTS', function () {
    console.log("Compilando typescriptTS e minificando typescriptTS...");
    return gulp.src('ts/typescript.ts')
        .pipe(ts())
        // .pipe(gulp.dest('js'))
        .pipe(concat('typescript.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsFolderMin));
});

gulp.task('saldoTS', function () {
    console.log("Compilando saldoTS e minificando saldoTS...");
    return gulp.src('ts/saldoComponente.ts')
        .pipe(ts())
        // .pipe(gulp.dest('js'))
        .pipe(concat('saldoComponente.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsFolderMin));
});

gulp.task('novaTransacaoTS', function () {
    console.log("Compilando novaTransacaoTS e minificando novaTransacaoTS...");
    return gulp.src('ts/novaTransacaoComponente.ts')
        .pipe(ts())
        // .pipe(gulp.dest('js'))
        .pipe(concat('novaTransacaoComponente.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsFolderMin));
});

// // Compile bytebank.ts
// gulp.task('bytebankTS', function () {
//     console.log("compile bytebankTS...");
//     return gulp.src('ts/bytebank.ts')
//         .pipe(ts())
//         .pipe(gulp.dest('js'));
// });

// // Minify bytebank.js
// gulp.task('bytebankJS', function () {
//     console.log("compile bytebankJS...");
//     return gulp.src('js/bytebank.js')
//         .pipe(concat('bytebank.min.js'))
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

// //  coloca as "tasks" em um array chamado "buildsass"
// gulp.task('buildcss', gulp.series(
//     'cssApp',
// ));

gulp.task('buildjs', gulp.series(
    'typescriptTS',
    'saldoTS',
    'novaTransacaoTS',
));

//  cria o comando "gulp watch" que fica observando o array de taks
exports.watch = function () {
    watch('ts/*.ts', gulp.series('buildjs'));//Verifica arquivos principais
};
