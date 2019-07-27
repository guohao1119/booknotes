### vuelidate
    简单、轻量、基于model的vue校验插件
    
#### 安装
    npm install vuelidate --save
    
#### 基础用法
##### 1 全局引用
        通过import引入，作为Vue的一个插件使用
        import Vue from 'vue'
        import Vuelidate from 'vuelidate'
        
        Vue.use(Vuelidate)
        
##### 2 作为单个组件的mixin混入
        import {validationMixin} from 'vuelidate'
        var Component = Vue.extend({
            mixins: [validationMixin],
            validations: {
                ...配置其他校验规则
            }
        })
        
##### 3 如果更习惯require，和import类似
        const { validationMixin, default: Vuelidate } = require('vuelidate')
        const { required, minLength } = require('vuelidate/lib/validations')
        
##### 4 也可以直接在html中引入
        <script src="vuelidate/dist/vuelidate.min.js"></script>
        //全局使用
        Vue.use(window.vuelidate.default)
        
        //在组件中mixin
        var validationMixin = window.vuelidate.validationMixin

#### 基础表单
    对于想要校验的每一个值，需要在validations的选项中创建一个key值。
        
    
        