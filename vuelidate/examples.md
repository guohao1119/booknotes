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

#### 校验分组
  如果想要为许多没有其他关系的数据域分组创建一个校验器，可以创建一个校验分组

    validations: {
      flatA: {required},
      flatB: {required},
      forGroup: {
        nested: {required}
      },
      // 将三个数据作为一个分组
      validationGroup: ['flatA', 'flatB', 'forGroup.nested']
    }

#### 集合校验
  通过$each关键字实现对数组校验的支持

  data() {
    return {
      people: [
        {name: '1'},
        {name: '2'}
      ]
    }
  },
  validations: {
    people: {
      required,
      minLength: minLength(3), // 校验people数组长度最少为3
      $each: { // 校验数组中每一个元素
        name: {
          required,
          minLength: minLength(4)
        }
      }
    }
  }

  #### 异步校验
    现成支持异步。 只需使用校验器返回一个promise。

    promise的成功返回值直接用作校验。
    
    promise的失败返回使得校验失败同时抛出一个错误。

      validations: {
        username: {
          isUnique(value) {
            if (!value) return true;

            // 模拟一个异步调用
            return new Promise((resolve, reject) => {
            })
          }
        }
      }

    任何组件的数据必须同步访问，以便能够正确响应行为。

    如果需要在异步回调中使用，就在校验器的作用域内将它以变量存储，例如在.then中

    校验器在每一次数据变化时被计算，因为它本质上是一个计算属性。

    如果要限制异步调用，在数据变化事件中处理，而不是在校验器自身。否则，可能会以损坏的Vue观测结果而告终。

    async/await语法也是完全支持的。结合Fetch API使用时，效果很好。

      validations: {
        username: {
          async isUnique(value) {
            if (!value) return true;

            const response = await fetch(`/api/isUnique/${value}`);

            return await response.json();
          }
        }
      }

  #### 延迟校验错误
    通过$touch状态你可以做任何你想要做的事情，无论你的需求有多奇特。
    
    只需要在合适的时机调用$touch和$reset

  #### 访问校验器参数
    可以通过父级校验器的$params参数访问当前校验器的信息

    这在向用户报告错误信息时是很有用的

  #### 动态校验规则
    校验规则可以是一个函数，这使得它可以是动态的，可以依赖于模型数据

    如果是一个计算属性，会自动进行重新计算

    校验器的$dirty状态会被保留只要属性名不再改变或消失

      data() {
        return {
          hasDes: false,
          name: '',
          des: ''
        },
        validations() { // 函数形式定义validations
          if (!this.hasDes) {
            return {
              name: {required}
            }
          } else {
            return {
              name: {required},
              des: {required}
            }
          }
        }
      }

#### 动态参数
  因为整个校验过程是基于计算属性的，可以将校验器的名称设为动态的。

  这种情况下，当数据随时间变化时，行为也是动态变化的。

    data() {
      return {
        name: '',
        minLength: 3,
        valName: 'validateName'
      }
    },
    validations() {
      return {
        name: {
          [this.valName]: minLength(this.minLength)
        }
      }
    }
