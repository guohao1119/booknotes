#### 基本使用流程
    
    
    1 安装gulp
        npm i --save-dev gulp
    2 创建配置文件gulpfile.js
    3 执行gulp配置
    
#### gulpfile.js

    gulp的配置文件
    此文件会在node环境下执行
    
##### 基本使用

    1 使用exports导出一个foo函数
        exports.foo = () => {
          console.log('foo')
        }
    2 命令行执行gulp foo 会打印foo
        但是同时也会报错，因为gulp要执行的任务必须是异步的
        因此需要传入一个done作为回调函数
        exports.foo = done => {
          console.log('foo')
          done() // 标识任务结束
        }
    
##### 默认任务

    exports.default = done => {
      console.log('default')
      done()
    }

##### 旧版本定义任务的方式

    在gulp4.0版本之前定义任务的方式，虽然仍然兼容，但已经不再推荐
    1 引入gulp
        const gulp = require('gulp')
    2 通过task定义任务
        gulp.task('bar', done => {
          console.log('bar')
          done()
        })
        
##### 组合任务

    通过gulp提供的series和parallel方法分别提供串行和并行任务

    // 1 引入series和parallel
    const {series, parallel} = require('gulp')

    // 2 定义三个内部任务
    const task1 = done => {
      setTimeout(() => { // 使用setTimeout模拟异步
        console.log('task1')
        done()
      }, 1000)
    }
    const task2 = done => {
      setTimeout(() => {
        console.log('task2')
        done()
      }, 1000)
    }
    const task3 = done => {
      setTimeout(() => {
        console.log('task3')
        done()
      }, 1000)
    }

    // 3 分别定义串行、并行任务
    // series 串行执行三个任务
    exports.tasksA = series(task1, task2, task3)
    // parallel 并行执行三个任务
    exports.tasksB = parallel(task1, task2, task3)
    
    // 4 执行任务
    gulp tasksA
    gulp tasksB
    
    [series](https://github.com/guohao1119/booknotes/blob/master/images/gulp-series-task.png)
    
    [parallel](https://github.com/guohao1119/booknotes/blob/master/images/gulp-parallel-task.png)