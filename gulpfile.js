var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer'), // Подключаем библиотеку для автоматического добавления префиксов
    concatCss = require('gulp-concat-css');

gulp.task('sass', function() { // Создаем таск Sass
    return gulp.src('app/common.blocks/**/*.scss') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/tmp')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({ stream: true })) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        }
    });
});

gulp.task('scripts-libs', function() {
    return gulp.src([ // Берем все необходимые библиотеки
            'app/library.blocks/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
        ])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});

gulp.task('css', ['sass'], function() {
    return gulp.src('app/tmp/**/*.css') // Выбираем файл для минификации
        .pipe(concatCss("main.css"))
        .pipe(cssnano()) // Сжимаем
        .pipe(rename({ suffix: '.min' })) // Добавляем суффикс .min
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', function() {
    return gulp.src('app/common.blocks/**/*.js') // Выбираем файл для минификации
        .pipe(concat("main.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('tmp', function() {
    return del.sync('app/tmp');
});

gulp.task('watch', ['browser-sync', 'css', 'scripts', 'scripts-libs', 'tmp'], function() {
    gulp.watch('app/common.blocks/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/pages/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/common.blocks/**/*.js', ['scripts']);
    gulp.watch('app/tmp/*.css', ['css']);
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') // Берем все изображения из app
        .pipe(cache(imagemin({ // С кешированием
            // .pipe(imagemin({ // Сжимаем изображения без кеширования
            interlaced: true,
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        })) /**/ )
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'img', 'css', 'scripts', 'scripts-libs', 'tmp'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
            'app/css/main.min.css',
            'app/css/libs.min.css'
        ])
        .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
        .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/pages/*.html') // Переносим HTML в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('clear', function(callback) {
    return cache.clearAll();
})

gulp.task('default', ['watch']);