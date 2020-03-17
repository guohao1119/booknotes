#### 前言

早就听说过fetch这个东西，知道它也是用来发送http请求，调用后端接口的，为什么要用'也'呢，因为本人早几年用jquery写js的时候，用的是jquery的ajax，后来用vue开发项目的时候用上了axios，之后就爱不释手了。虽然听说还有个fetch，据说还挺火，但是深深不以为意，小样儿，还能好用过axios？

    最近自我总结了一下axios的使用、撸了一遍源码，想到fetch这么个同类，反思自己，为何不去了解一下呢，都不知道人家到底是个什么东西就觉得它不行，实在是井底之蛙。由此，开始我认识的fetch之旅。
    
    百度fetch，搜索结果第1条居然是MDN，瞬间觉得fetch大佬逼格好高，恕我孤陋寡闻，赶紧拜读起来。
    
##### 使用Fetch MDN

    Featch API提供了一个js接口，用来访问和操纵http管道的一些具体部分，例如请求和响应。还提供了一个全局fetch方法，提供了一种简单合理的方式来跨网络异步获取资源
    
##### fetch与jQuery.ajax的区别：
       
    1 对状态码的处理不同
        接收到代表错误的http状态码时，fetch返回的promise不会是reject状态的，哪怕状态码是404或者500，而是resolve状态的（但是返回值的ok属性会设置为false），只有当网络故障或者请求被阻止时，才会进入reject
        ajax对于状态码不在2XX范围内的就会进入error
        
    2 是否支持跨域 
        fetch不接受跨域cookies，不能使用fetch()建立跨域会话
        ajax可以通过jsonp实现跨域
        
    3 fetch不会发送cookies
        
        
#### 使用

    fetch('http://xxxx', {}) // 支持传参数
        .then(res => {
            console.log(res)
        })
        

#### 源码篇

    在github上找到fetch项目，按照惯例我们还是先打开package.json看一眼，发现里边的main对应的./dist/fetch.umd.js，发现这是构建后的文件，那就看module对应的fetch.js啦
    
##### fetch.js

    大概扫描一下整个文件的内容，注意到最后几行有点意思
    if (!self.fetch) {
      self.fetch = fetch
      self.Headers = Headers
      self.Request = Request
      self.Response = Response
    }
    
    很简单，如果self.fetch不存在，就给它赋值fetch，同时还赋值了Headers,Request,Response
    
    那么self是个什么东东呢？
    它是一个全局变量，一个指向当前环境顶级对象的变量，也就是Window
    
    接下来我们就分别看看fetch、Headers、Request、Response

##### fetch
    
    function fetch(input, init) {
        // 返回一个Promise实例
        return new Promise(function(resolve, reject) {
            
        })
    }
    
    再看下Promise中的内容
    
    // new了一个Request实例出来，这个Request封装了请求相关的东西
    var request = new Request(input, init)
    
    接着是xhr的一个流程
    new
    onXXX
    open
    send
    在这个过程中，使用request处理请求相关内容，使用response处理响应相关内容
    

#### 小结

    由于本人并不常用fetch，代码没有详读，只是了解一下。从整个fetch文件来看，封装了fetch方法，Headers、Request、Response等对象，这些对象在fetch方法中分别处理请求、响应等相关的内容，同时也将这些对象暴露出去提供给全局对象window使用
    
    
#### jQuery.ajax、axios、fetch三者对比分析

    https://segmentfault.com/a/1190000012836882
    这篇文章写的不错
    
    
    
    
    
    
    
    
