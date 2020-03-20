学习，总是由浅入深的。要掌握一个技术点，首先肯定是学习怎么用，然后要知道为什么这么用，最后是知道怎么能用的更好。想要知道怎么能用的好，必然要了解其原理，那就必须通过阅读源码去认识它到底是怎么实现的。这就是所谓的知其然，更知其所以然。

## 第一步：学习怎么用
    
    官网已经给出了最好的使用教程，翻译成中文便于阅读吧
    
#### axios的定义
        
用于浏览器和node的基于Promise的HTTP客户端
    
    这个定义中包含了好几个重点
        1 用于浏览器和node：说明既可以在浏览器使用，又可以在node使用
        2 基于Promise（ES6特性，此处不多解释）
        3 HTTP客户端：说明了它就是用来发送http请求的
        
#### 特性

- 从浏览器发送XHR（XMLHttpRequest）
- 从node发送http请求
- 支持Promise Api
- 拦截请求和响应
- 变换请求和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防止XSRF
        
    前3点特性和axios的定义一致
    拦截请求和响应：可以在请求发出之前和响应接收之后做一些公共的处理
    变换请求和响应数据：拦截到之后就可以进行数据处理啦
    取消请求：一些场景下可能需要取消已发出但未结束的请求
    最后两点还需要再学习

#### 安装

    npm
        npm install axios
    bower
        bower install axios
    yarn
        yarn add axios
    cdn
        <script src="xxx/axios.min.js"></script>
        
#### 示例

##### 执行一个get请求

    // 第一种方式
    axios.get('/user/?id=123') // 参数直接在url中
        .then(res => {
            // 请求成功后的处理
        })
        .catch(err => {
            // 请求失败后的处理
            console.log(err)
        })
        .then(() => {
          // 成功或失败都会执行的处理   
        })
        
    // 第二种方式
    axios.get('/user', { // url单独写
        params: { // 参数放在params中
            id: 123
        }
    }).then(...) // 后面和第一种方式一样
    
    // 想使用async/await
    async getUser() {
        try {
            const res = await axios.get('/user?id=123')
            console.log(res) // 成功的处理
        } catch (err) {
            console.log(err) // 失败的处理
        }
    }
    
##### 执行一个post请求

    axios.post('/user', {
        name: 'gg',
        age: 20
    }).then(...) // 后面和get请求一样
    
    这里需要特别注意的是，post和get请求中的传参区别，get请求中需要将参数放在params中，而post没有
    
##### 执行多个并发请求

    function getUser() {
        return axios.get('/user')
    }
    function getList() {
        return axios.get('/list')
    }
    // 调用all，传入多个请求，请求全部返回后才执行回调
    axios.all([getUser(), getList()])
        .then(axios.spread(userinfo, listdata) => {
            console.log(userinfo)
            console.log(listdata)
        })
    
##### 创建一个实例

    可以通过创建一个新的axios实例来自定义配置
    
    axios.create([config]) // 用[]包裹，并不是要以数组的形式传入config，而是表示config参数是可有可无的，不传也可以
    
    const instance = axios.create({
        // 一些自定义配置
        baseURL: 'xxx',
        timeout: 20000,
        headers: {xxx}
    })
    
    实例方法
    axios#request(config)
    axios#get(url[, config])
    axios#delete(url[, config])
    axios#head(url[, config])
    axios#options(url[, config])
    axios#post(url[, data[, config]])
    axios#put(url[, data[, config]])
    axios#patch(url[, data[, config]])
    axios#getUri([config])
    
##### 请求的配置

    发送请求时可配置的选项，只有url是必须的，没有指定方法则使用get请求
    {
        url: '/user', // 请求地址
        method: 'get', // 请求方法，默认get
        baseURL: 'https:xxx/', // 请求地址公共前缀，接口地址中只需写相对路径即可
        transformRequest,
        transformResponse,
        headers: {},
        params: {},
        paramsSerializer: params => {
            return Qs.stringify(params, {arrayFormat: 'brackets'})
        },
        data: {
            name: 'gh'
        },
        data: 'a=1&b=2',
        timeout: 20000,
        withCredentials: false,
        adapter: function(config) {
            
        },
        auth: {
            username: 'gh',
            password: '123456'
        },
        responseType: 'json',
        responseEncoding: 'utf8',
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        onUploadProgress: function (progressEvent) {
        },
        onDownloadProgress: function (progressEvent) {
        },
        maxContentLength: 2000,
        maxBodyLength: 2000,
        validateStatus: function (status) {
            return status >= 200 && status < 300; // default
        },
        maxRedirects: 5,
        socketPath: null,
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
        proxy: {
            host: '127.0.0.1',
            port: 9000,
            auth: {
                username: 'mikeymike',
                password: 'rapunz3l'
            }
        },
        cancelToken: new CancelToken(function (cancel) {
            
        }),
        decompress: true // default
    }
    
##### 响应格式
    
    请求的响应包含以下信息
    {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {}
    }
    
    当使用then，就会接收到这样的响应数据
    axios.get('/user/123')
    .then(res => {
        console.log(res.data)
        console.log(res.status)
        console.log(res.statusText)
        console.log(res.headers)
        console.log(res.config)
    })
    
#### 配置默认值

    可以指定默认配置，应用于每一个请求
    
    全局默认值
    axios.defaults.baseURL = 'http://xxx'
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    
    自定义实例默认值
    // 创建实例时传入默认值
    const instance = axios.create({
        baseURL: 'http://xxx'
    })
    // 创建实例后修改默认值
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
    
#### 配置优先级

    配置会按照优先级合并在一起。顺序是：在lib/defaults.js中的默认值，实例的默认属性，请求的配置参数。越往后优先级越高。也就是请求的配置参数>实例的默认属性>lib/defaults.js中的默认值
    const instance = axios.create()
    instance.defaults.timeout = 2500
    instance.get('/longRequest', {
        timeout: 5000
    })
    
#### 拦截器

    在then或catch处理前可以拦截请求或响应
    
    // 请求拦截器
    axios.interceptors.request.use(config => {
        return config
    }, error => {
        return Promise.rejext(error)
    })
    
    // 响应拦截器
    axios.interceptors.response.use(response => {
        return response
    }, error => {
        return Promise.reject(error)
    })
    
    如有需要，可以移除拦截器
    const myInterceptor = axios.interceptors.request.use(xxxx)
    axios.interceptors.request.eject(myInterceptor)
    
    可以给axios实例添加拦截器
    const instance = axios.create()
    instance.interceptors.request.use(function () {/*...*/})
    
#### 处理错误

    axios.get('/user/123')
        .catch(error => {
            if (error.response) {
                
            } else if (error.request) {
                
            } else {
                console.log(error.message)
            }
            console.log(error.config)
        })
        
    使用validateStatus配置项，可以自定义抛出错误的Http状态码
    
    axios.get('/user/123', {
        validateStatus: status => status < 500
    })
    
    使用toJSON可以得到一个有更多Http错误信息的对象
    axios.get('/user/123')
        .catch(err => {
            console.log(err.toJSON())
        })
        
#### 取消

    可以使用cancel token取消请求
    
    使用CancelToken.source创建一个cancel token
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    
    axios.get('/user/123', {
        cancelToken: source.token
    }).catch(thrown => {
        if (axios.isCancel(thrown)) {
            console.log('request canceled', thrown.message)
        } else {
            // 处理错误
        }
    })
    
    axios.post('/user/123', {
        name: 'gh'
    }, {
        cancelToken: source.token
    })
    
    source.cancel('取消请求')
    
    也可以通过向CancelToken构造器传递一个执行方法来创建一个cancel token
    const CancelToken = axios.CancelToken
    let cancel
    
    axios.get('/user/123', {
        cancelToken: new CancelToken(funciton executor(c){
            cancel = c
        })
    })
    
    cancel()
    
#### 使用application/x-www-form-urlencoded格式

    略
    

## 源码篇

    从package.json可以知道，入口文件是index.js
    
    index.js
        就一行
        module.exports = require('./lib/axios');
        
        这一行要分为两步看，首先是require('./lib/axios')，引入了lib下的axios文件，然后通过module.exports导出
        那我们来看下axios文件暴露了什么东西出来
        
    lib/axios
        这里创建了一个axios的实例对象，并在该实例对象上添加了一些方法和属性，最后将该axios实例暴露出去
        var axios = createInstance(defaults); // 以默认配置创建实例对象
        
        axios.Axios
        axios.create
            如果调用create，则会将传入的参数与默认参数进行合并mergeConfig
        axios.Cancel
        axios.CancelToken
        axios.isCancel
        axios.all
        axios.spread
        
        来看下createInstance方法是怎么得到一个实例的
        function createInstance(defaultConfig) {
          // 创建实例
          var context = new Axios(defaultConfig);
          // 中间的先不管
          var instance = bind(Axios.prototype.request, context);
        
          // Copy axios.prototype to instance
          utils.extend(instance, Axios.prototype, context);
        
          // Copy context to instance
          utils.extend(instance, context);
        
          // 返回实例
          return instance;
        }
        
       创建实例对象时传入默认的配置defaults，来自lib/defaults.js
    
    lib/defaults.js
        这里定义了默认的参数配置
        var defaults = {
            adapter: getDefaultAdapter(),
            transformRequest,
            transformResponse,
            timeout: 0, // 不限制超时时间
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN',
            maxContentLength: -1,
            maxBodyLength: -1,
            // 2XXX的状态码不会抛出异常
            validateStatus: function validateStatus(status) {
                return status >= 200 && status < 300;
            }
        }
        
        这里需要注意看下getDefaultAdapter方法，它会判断当前是浏览器环境还是node环境，从而返回对应的适配器，适配器的内容我们后面再细说
        
        看完了默认参数，我们看下axios的实例是怎么创建的，也就是new Axios(defaults)到底做了什么
        
    core/Axios.js // 在core文件夹，核心喔，重点来咯
        这里做了几件事
        1 定义Axios构造函数
        2 定义Axios原型方法
        
        1 构造函数
        function Axios(instanceConfig) {
          this.defaults = instanceConfig;
          this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
          };
        }
        构造函数做了什么呢？
            1 接收配置，存于defaults中
            2 分别创建请求和响应的拦截器实例放在interceptors的request和response中
        2 原型方法：
            Axios.prototype.request
            Axios.prototype.getUri
            Axios.prototype[method] // http请求方法'delete', 'get', 'head', 'options，'post', 'put', 'patch'，在原型中绑定后，就可以在Axios的实例中直接调用了
        这里需要注意的一个知识点：
            构造函数中的属性，会在每个实例中生成一份，独立使用
            原型中的方法，则是每个实例都共享的
            
            看下拦截器的实现
            
        core/InterceptorManager.js
            构造函数中定义一个数组，用于存放拦截器
            this.handlers = []
            定义了三个原型方法
            // 往数组中添加一个拦截器
            use() 
            // 删除数组中的一个拦截器
            eject()
            // 遍历执行数组中的拦截器
            forEach()
            
        读完上面两个文件，我们可以知道，new Axios生成的实例中，包含了实例的参数配置，拦截器，以及各类请求方法
        
        回到axios.js中，看看创建实例后还做了什么
        // 将Axios原型中的request方法绑定到实例中
        var instance = bind(Axios.prototype.request, context);
        // 将Axios原型复制到实例中
        utils.extend(instance, Axios.prototype, context)
        // 将context实例复制到instance中
        utils.extend(instance, context);
        
            
#### 工具方法

##### bind
    // 这里和Function.prototype.bind一致，为什么要自己实现一遍呢？
    function bind(fn, thisArg) {
        return function wrap() {
            var args = new Array(arguments.length)
            for (var i = 0; i < args.length; i++) {
                // 拷贝一份参数
                args[i] = arguments[i]
            }
            // 修改fn的调用对象
            retrun fn.apply(thisArg, args)
        }
    }
        
##### extend
    // 将b对象中的属性拷贝一份到a对象中，如果b对象的属性值是一个方法，则将该方法的执行对象修改为thisArg之后，再拷贝到a中，最后返回a
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    
#### 深入探究篇

    前文提到axios通过adapter适配浏览器和node环境，我们具体来看下是如何实现的
    
    adapters/xhr.js 浏览器的实现
    
    我们先来回一下浏览器发起http请求的底层实现
    var request = new XMLHttpRequest() // 创建一个XHR对象
    request.open(method, url, true) // 打开请求地址，最后一个参数为true表面是异步请求
    request.send(data) // 发送数据
    request.onreadystatechange = function () { // 监听状态变化
    }
    
    以上是最基础的实现，axios要做的事情无非仍然是这几步，只不过在此基础上进行了改进，提供了更便捷、更丰富的功能
    
    第1步，创建xhr对象肯定是不变的
    第2步，调用open方法时，传参进行了一定的处理
        // 将配置中的method转成大写
        method：config.method.toUpperCase()
        // 拼接baseURL和url，同时也会将params中的参数拼接到url后面
        url：buildURL()
    第3步，设置超时时间(毫秒)
        request.timeout = timeout
    第4步，处理onreadystatechange回调
        这里边处理了请求使用file协议的情况
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
            return;
        }
        然后对响应数据进行了封装
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText: request.response
        // 从这里就可以知道为什么axios的默认响应数据是包了一层的
        var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config: config,
            request: request
        }
        
        settle(resolve, reject, response)
        // 响应处理完了，将xhr实例置为null，以便垃圾回收，值得学习！
        request = null
    第5步，处理onabort回调
    第6步，处理onerror回调
    第7步，处理ontimeout回调
    后面还有一些不太常用的处理，包括添加头部添加xsrf，处理withCredentials，处理responseType，处理上传和下载的进度，取消请求的处理等等，不具体展开了，有需要再去了解即可
    
    需要特别注意到的一点是，这里用到了Promise，该Promise的resove，reject，response放在settle函数中处理，我们来看下这个函数
    
    function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError(
          'Request failed with status code ' + response.status,
          response.config,
          null,
          response.request,
          response
        ));
      }
    }
    axios配置项中的validateStatus能够根据用户配置的status来处理resolve还是reject，就是在这里实现的
    
    adapters/http.js node的实现
        在node环境下提供和浏览器环境下一样的功能，用node相关的特性实现，不再详细介绍
        

##### 取消请求的实现

    先来回顾下怎么取消请求
    // 第1步：拿到axios的CacelToken对象
    const CancelToken = axios.CacelToken
    // 第2步：调用CancelToken中的静态方法source
    const source = CancelToken.source() // 返回一个对象，包含token和cancel两个属性
    // 第3步：请求时传入cancelToken属性，值为上一步生成的source中的token
    axios.get('/user/123', {
        cancelToken: source.token
    })
    
    source.cancel() // 调用cancel取消请求
    
    源码解析：
    首先看下source方法
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token: token,
        cancel: cancel
      };
    };
    该静态方法调用构造函数，传入一个执行方法，执行方法的回调是cancel，构造函数返回的是token
    最终将token和cancel组合成对象返回出去
    
    我们看下构造函数做了什么
        1 构造函数传入的参数必须是一个方法，否则报错
        2 定义一个局部变量resolvePromise，new一个Promise，将resolvePromise赋值为该Promise的resolve
        3 var token = this, token指向当前实例对象
        4 调用构造函数入参方法，其回调就是cancel
        5 cancel中会给token的reason属性赋上消息提示，然后调用resolvePromise，promise执行完成
    
#### 总结:

    1 通过阅读源码，可以真正了解到axios是做什么的，是怎么实现的，把握其原理
    2 同时支持浏览器和node，因为源码中在adaptor中判断了当前环境，如果是浏览器则创建XHR对象，如果是node则使用http模块
    3 参数可以采用默认配置，也可以自己创建实例并传入参数，也可以在发送请求时传入参数，越靠后，优先级越高
    4 请求和响应的拦截器相当于一些中间件，使用一个数组维护，每创建一个拦截器就调用use方法放入数组中，使用时遍历数组按顺序调用，也可以调用eject去掉拦截器
    5 请求方法支持多种形式
        1 axios({})
        2 axios(url, {})
        3 axios.get(url, {})
        4 axios.post(url, data, {})
        5 axios.request({})
    6 取消请求(CacelToken)
    7 并发请求(Promise.all, spread)
    