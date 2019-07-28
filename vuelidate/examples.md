#### 基础表单
    首先要将表单中的input通过v-model的形式与data中的数据绑定

    对于想要校验的每一个值，需要在validations的选项中创建一个key值。

##### $v的各个属性值
![vuelidate1](https://github.com/guohao1119/booknotes/raw/master/vuelidate/images/vuelidate1.png)
##### $v的name的各个属性值
![vuelidate2](https://github.com/guohao1119/booknotes/raw/master/vuelidate/images/vuelidate2.png)
        
    
    可以看到，在组件中配置了validations后，会在组件实例中添加一个$v对象，其中保存着校验相关的数据

    其中，以$开头的属性是vuelidate内置属性，而在validations中配置的每一个属性都会保存在$v中，
    而这些属性也同样含有以$v开头的内置属性，以及在validations中配置的校验规则

    这些校验规则会影响内置属性的值，随着数据的变化，内置属性的值会根据校验规则而变化，需要根据这些值的变化自定义设置校验提示

#### 不使用v-model
    当你不想直接修改model时(输入和事件绑定分离)，仍然可以使用。
    
    这种情况通常是在使用来自外部的数据，例如Vuex或者props。
    
    这种情况下，需要通过在合适的时候调用$touch()方法来手动控制$dirty的值

#### 表单提交
    在提交表单之前要校验所有要校验的内容是否通过校验。在发送表单提交请求之前，可以通过检查$invalid的状态来实现

#### 关联校验
    可以通过关联校验器将相关的数据域关联起来。内置的sameAs就是如此。

#### 数据网罗
    可以设置多个校验器来匹配数据。
    
    只要有一个子校验器处于$invalid状态，父级校验器就处于$invalid状态。
    
    这对于表单的整体校验很有用（表单提交时判断父级状态即可）。

#### $error vs $anyError
    有两种方式来判断是否要显示错误信息。弄清楚使用哪种方式更适合是很重要的。

    既可以使用$error，也可以使用$anyError，或者使用低级别的变量：$dirty或者$anyDirty。

    文档的例子中主要使用$error，但是选择权在自己手中。
