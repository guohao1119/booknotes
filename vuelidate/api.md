### API
  在vuelidate中有2个结构

  **validations** 组件选项：定义校验器

  **$v** 在viewmodel中维持校验器状态的对象

#### $v的值
  $v模型表示校验器当前的状态

  它通过定义一组属性来实现，这些属性包含用户定义的校验函数的输出，遵循validations的选项结构

  这些特殊保留关键字的存在意味着您不能用该名称指定自己的校验器

名称 | 类型 | 描述
---|---|---
$invalid | boolean | 指示给定模型的校验状态。当选项中指定的任何子验证器返回错误值时变为真。对于验证分组，将考虑所有分组的验证程序。
$dirty | boolean | 用来表示被校验字段是否被用户至少触发(touch)一次。通常用于决定是否向最终用户显示提示信息。可以通过手动使用$touch和$reset方法管理这个标记。当向$model写值时会自动设置它。当给定的模型被$touch过或者所有的子模型的$dirty是true时，$dirty标记为true
$anyDirty | boolean | 一个和$dirty类似的标记，除了一点例外。当给定的模型被$touch过或这任意一个子模型的$anyDiry是true时，$anyDirty标记被认为是true
$model | any | 对原始校验模型的引用。读取这个值会直接返回引用的模型的值。这意味着当读取时this.$v.value.$model和this.value是等价的。写这个值会更新模型并自动调用$touch。这对于用它作为v-model的载荷是很有用的，提供了一种当第一次触发一个给定的数据域时自动标记为$dirty的方式。和.lazy修改器搭配的很好。
$error | boolean | 决定提示消息是否显示的便捷标记。等价于this.$dirty && !this.$pending && this.$invalid
$anyError | boolean | 决定提示消息是否显示的便捷标记。一个当任意子结点是$anyDirty时要显示错误信息的变量。等价于this.$anyDirty && !this.$pending && this.$invalid
$pending | boolean | 表明任意子异步校验器处于pending状态。如果所有校验器是同步的，那么永远是false
$params | object | 包含当前层级下所有校验器的类型和参数，以及子验证分组的类型和参数，可能使用withParams声明。可以作为错误渲染系统的一个输入。在翻译过的文本中安全使用。
$each | object | 掌握所有校验模型的集合校验器。一直保存着原始模型的key值，同时也掌握所有相关联的校验器的额外的名字以及特殊值，比如$invalid。v-for指令内部更倾向于使用一个特殊的$iter。
$iter | object | 仅仅作为$each的直接孩子存在。掌握集合校验器的所有校验模型，别无其他。在v-for循环中可以被安全地引用来遍历所有的模型校验器。

#### $v的方法
  有一系列方法用于控制校验模型。在嵌套的每一层都可以访问。所有的方法都可以用于你需要用到的任何事件处理中。没有其他语法去决定dirty标记该被设置。仅仅使用标准的@input和@blur绑定。

名称 | 描述
--- | ---
$touch | 递归设置模型以及孩子的$dirty标记为true
$reset | 递归设置模型以及孩子的$dirty标记为false
$flattenParams | 返回一个叶子参数的数组

#### 配置关键字

名称 | 类型 | 描述
--- | --- | ---
$each | object | 独立应用于给定模型的每一个属性的校验器定义。适用于校验数组，也能用于任何对象或者集合。
$trachBy | string|| func | 必须是$each的直接孩子，但是是可选的。定义被$each用来追踪子模型的对象的属性的存取器。必须用它去纠正随机插入的$dirty的值。当没有设置时，使用key值进行追踪。
