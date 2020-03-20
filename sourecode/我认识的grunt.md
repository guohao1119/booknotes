#### 自动化构建
    
    为了提高开发效率，使用网页三剑客纯手工撸代码的时代早已过去，现代化的前端开发，通常会使用一些新的语法、规范、标准。
    
    例如：
        ECMAScript的最新标准
        sass增强css的可编程性
        利用模板引擎抽离页面中的重复html
    
    但这些用法在浏览器中是不支持的
    这就需要一些工具将开发代码转换成生产代码。
    这些工具就是自动化构建工具，转换的过程称为自动化构建工作流。
    常见的有grunt、gulp、fis等。
    本文先来了解grunt。

#### gruntfile.js

    使用grunt只需安装相关依赖，并配置一个gruntfile.js文件即可
    该文件用于定义一些需要Grunt自动执行的任务
    需要导出一个函数
    该函数接收一个grunt的形参，内部提供一些api
    
##### 最简示例

    module.exports = grunt => {
        grunt.registerTask('foo', () => {
            console.log('foo')  
        })
    }
    
    使用grunt.registerTask注册一个任务
    
    然后在命令行就可以执行该任务
    npm run grunt foo
    
#### 增加描述

    // 第二个参数传入字符串
    grunt.registerTask('bar', '任务描述', () => {
        console.log('bar')
    })
    
    通过npm run grunt --help查看帮助信息，会出现在available tasks中，任务描述会在任务名后显示
    
#### 默认任务

    // 如果任务名称指定为default，那么执行任务时不指定名称，会自动执行default的任务
    grunt.registerTask('default', () => {
        console.log('default')
    })
    
    npm run grunt即可
    
    默认任务列表
    // 在默认任务的第二个参数中传入一个方数组，数组中是任务名称，则会依次执行这些任务
    grunt.registerTask('default', ['foo', 'bar'])
    
#### 异步任务

    // 对异步操作的支持
    grunt.registerTask('async-task', function() { // 由于使用到this，所以这里不能使用回调函数
        const done = this.async() // 必须拿到这个回调函数
        setTimeout(() => {
          console.log('模拟异步执行中')
          done() // 异步任务执行完成后执行done，grunt才知道异步任务已完成
        }, 2000)
    })
    
#### 标记失败

    // 如果需要标记任务执行失败，使用return false，如果该任务处于一个任务列表中，则后续任务不再执行
    grunt.registerTask('bad', () => {
        console.log('error')
        return false
    })
    
    // foo和bad会执行，bar不会执行
    grunt.registerTask('default', ['foo', 'bad', 'bar'])
    
    如果需要即使失败也继续执行，则需要加上--force
    npm run grunt default --force
    
    // 如果需要标记异步任务执行失败，则只需要在执行完毕的回调函数中传入false参数即可
    grunt.registerTask('async-bad', function(){
        const done = this.async()
        setTimeout(() => {
          console.log('async done')
          done(false) // 这里传入false
        }, 1000)
    })
    
#### 初始配置

    // 通过initConfig配置任务的相关选项
    grunt.initConfig({
        foo: '123', // 值可以是任意类型的
        bar: {
            a: 111
        }
    })
    
    // 在任务中使用grunt.config('xxx')拿到配置
    grunt.registerTask('config', () => {
        console.log(grunt.config('foo'))
        console.log(grunt.config('bar'))
    })
    
#### 多目标任务

    可以让任务根据配置形成多个子任务
    需要进行配置以生成多目标
    grunt.initConfig({
        build: {
            // 如果是options，则是当前任务的配置，而不是子任务
            options: {
                buildOptions: 1
            },
            // 不是options，是子任务
            taska: {
                // 子任务的配置，会覆盖父任务的配置
                options: {
                    buildOptions: 2,
                    taskaOptions: 2
                }
            },
            taskb: 2
        }
    })
    
    定义多目标任务，需要使用registerMultiTask
    grunt.registerMultiTask('build', function () { // 这里由于要使用this，不能使用箭头函数
    // 调用options方法获取当前任务的配置选项
    console.log(this.options())
    // 通过target拿到当前任务的名称，data拿到数据
    console.log(`target: ${this.target}, data: ${this.data}`)
    })
    
    执行任务时 npm run grunt build
    如果只执行某个子任务： npm run grunt build:taska
    
#### 使用插件

    社区封装了一些好用的插件，提供一系列构建功能
    
    插件的使用流程：
    1 安装npm插件包以及依赖包
    2 加载插件中提供的任务
    3 配置相关选项
    4 执行任务名称
    
    常见的有grunt-contrib-clean，grunt-sass，grunt-babel,grunt-contrib-watch，一一介绍
    
#### grunt-contrib-clean

    1 安装
    npm i --save-dev grunt-contrib-clean
    
    2 加载
    grunt.loadNpmTasks('grunt-contrib-clean')
    
    3 配置
    grunt.initConfig({
        clean: {
            // 删除temp下的test.js
            temp: 'temp/test.js',
            // 删除temp下的所有js文件
            temp: 'temp/*.js',
            // 删除temp下的所有文件夹及文件，包括temp自身
            temp: 'temp/**'
        }
    })
    4 执行
    npm run grunt clean // 注意这里执行的是配置中的clean，而不是grunt-clean
    
#### grunt-sass

    功能：将sass转义为css

    1 安装
    由于编译css文件需要用sass模块，所以这里要下载两个
    npm i --save-dev grunt-sass sass
    
    2 加载
    grunt.loadNpmTasks('grunt-sass')
    
    3 配置
    grunt.initConfig({
        sass: {
            main: {
                files: {
                    // 要在main.files下面配置对应的目标文件和源文件路径
                    // 目标文件路径: 源文件路径
                    'dist/css/main.css': 'sass/main.scss'
                }
            }            
        }
    })
    4 执行
    npm run grunt sass
    此时会发现报错了：必须要配置implementation选项
    
    5 引入sass模块
    const sass = require('sass')
    
    6 配置中添加implementation
    grunt.initConfig({
        sass: {
            options: {
                // 这里是配置用来转移sass的模块
                implementation: sass
            },
            main: {
                files: {
                    // 要在main.files下面配置对应的目标文件和源文件路径
                    // 目标文件路径: 源文件路径
                    'dist/css/main.css': 'sass/main.scss'
                }
            }            
        }
    })
    
#### grunt-babel

    功能：将js新特性转义为es5

    1 安装依赖grunt-babel @babel/core @babel/preset-env
    
    2 加载
    当我们在grunt中加入多个插件时，没有必要每一个都使用loadNpmTasks加载进来，可以使用load-grunt-tasks帮助我们完成多个插件的加载
        2.1 安装依赖load-grunt-tasks
        2.2 引入
            const loadGruntTasks = require('load-grunt-tasks')
        2.3 使用(需要将grunt传进去)
            loadGruntTasks(grunt)
    3 配置
    babel: {
      options: {
        sourceMap: true,
        // 配置babel预设的针对ECMAScript的转换规则
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          // 如果这里配置的路径找不到，会报错 Warning: The "path" argument must be of type string
          // 如果转义的js中有错误，也会报出来
          'dist/js/main.js': 'js/main.js'
        }
      }
    }
    4 执行
    npm run grunt babel
    
#### grunt-contrib-watch

    功能：监听文件变化后执行相应任务
    
    1 安装
    npm i --save-dev grunt-contrib-watch
    
    2 加载
    loadGruntTasks(grunt)
    
    3 配置
    watch: {
      js: {
        // 要监视的文件，通过数组和通配符的形式支持多个
        files: ['js/*.js'],
        // 要执行的任务也可以配置多个
        tasks: ['babel']
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass']
      }
    }
    
    由于watch只会在文件变化后才执行，所以需要在初始情况下执行一遍对应的任务
    所以需要配置default，设置任务队列，将watch放在最后
    grunt.registerTask('default', ['babel', 'sass', 'watch'])
    
    4 执行
    npm run grunt
    
#### 完整示例
    
    // 引入grunt-sass需要用到的sass
    const sass = require('sass')
    // 引入自动加载多个插件需要用到的load-grunt-tasks
    const loadGruntTasks = require('load-grunt-tasks')
    module.exports = grunt => {
      grunt.initConfig({
        // 配置sass插件
        sass: {
          options: {
            // 其他配置项查看官方文档
            sourceMap: true, // 生成map文件
            implementation: sass
          },
          main: {
            files: {
              // 目标文件路径: 源文件路径
              'dist/css/main.css': 'sass/main.scss'
            }
          }
        },
        // 配置babel插件
        babel: {
          options: {
            sourceMap: true,
            // 配置babel预设的针对ECMAScript的转换规则
            presets: ['@babel/preset-env']
          },
          main: {
            files: {
              // 如果这里配置的路径找不到，会报错 Warning: The "path" argument must be of type string
              // 如果转义的js中有错误，也会报出来
              'dist/js/main.js': 'js/main.js'
            }
          }
        },
        // 配置watch插件
        watch: {
          js: {
            // 要监视的文件，通过数组和通配符的形式支持多个
            files: ['js/*.js'],
            // 要执行的任务也可以配置多个
            tasks: ['babel']
          },
          css: {
            files: ['sass/*.scss'],
            tasks: ['sass']
          }
        }
      })
      // grunt.loadNpmTasks('grunt-sass')
      // 避免写多个loadNpmTasks，使用loadGruntTasks
      // 调用loadGruntTasks，将grunt传进来，就会自动加载使用到的插件
      loadGruntTasks(grunt)
    
      // 为了初始时执行相关任务，在这里进行一次配置，最后执行watch，以便文件变化后执行对应任务
      grunt.registerTask('default', ['babel', 'sass', 'watch'])
    }
    
#### 总结

    整体配置一遍下来，感觉grunt的使用思路还是很清晰的
    通过配置一系列任务并执行来完成自动化构建的工作流。
    插件的使用也很简单，安装、加载、配置、执行。
    但是整个配置过程还是比较复杂，一些高级应用还需要通过深入研究官方文档和不断实践来学习。
    grunt的学习就暂时告一段落啦~
    