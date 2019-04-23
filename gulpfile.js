const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
// const rename = require('gulp-rename')
// const concat = require('gulp-concat')
const autoprefix = require('gulp-autoprefixer')

//gulp文件流：src表示源头->pipe表示管道->dest表示终点
gulp.task('default', function () {
  console.log('执行gulp');
  return gulp.src('./src/**/*.less') //需要打包的css文件目录（gulp流的源头）
      .pipe(cssmin()) //通过cssmin将上一步骤生产出的style.css去掉中间的空白，使他变成压缩格式
      .pipe(autoprefix({ //通过autoprefix自动添加兼容各大浏览器的样式前缀，例如-webkit-，-o-
        browsers: ['last 2 versions'], //兼容最新2个版本
        cascade: false
      }))
      .pipe(gulp.dest('./lib')) //dest方法把上一步骤产出的style.min.css输出到“./dist/css”目录下（gulp流的终点）
})