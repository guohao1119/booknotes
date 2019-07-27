<template>
  <div id="app">
    <form @submit.prevent="submit">
      <label for="name">姓名</label>
      <input type="text" placeholder="请输入姓名" id="name" name="name" v-model.trim="$v.name.$model" />
      <div class="error" v-if="$v.name.$dirty && !$v.name.required">请输入姓名</div>
      <div class="error" v-if="!$v.name.minLength">至少 {{$v.name.$params.minLength.min}} 个字符.</div>
      <br />
      <label for="age">年龄</label>
      <input type="text" placeholder="请输入年龄" id="age" name="age" v-model.trim="age" @input="setAge($event.target.value)" />
      <div class="error" v-if="$v.age.$dirty && !$v.age.between">年龄必须介于 {{$v.age.$params.between.min}} 和 {{$v.age.$params.between.max}} 之间</div>

      <br />

      <label for="password">密码</label>
      <input type="password" placeholder="请输入密码" id="password" name="password" v-model.trim="password" />
      <div class="error" v-if="$v.password.$dirty && !$v.password.required">请输入密码</div>
      <div class="error" v-if="!$v.password.minLength">至少8位字符串</div>


      <br />
      <label for="repassword">确认</label>
      <input type="password" placeholder="请输入密码" id="repassword" name="repassword" v-model.trim="repassword" />
      <div class="error" v-if="!$v.repassword.sameAsPassword">密码不一致</div>

      <br />

      <button type="submit">提交</button>
      <br />
      <p>{{submitTips}}</p>
    </form>
  </div>
</template>

<script>

// 引入要用到的校验规则
import { required, minLength, between, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'app',
  data() {
    return {
      name: '',
      age: '',
      submitTips: '',
      password: '',
      repassword: ''
    }
  },
  beforeCreate() {
    console.log('beforeCreated, this.$v : ' + this.$v) //undefined
  },
  created() {
    console.log(this.$v)
    console.log('created, this.$v.name.$dirty : ' + this.$v.name.$dirty) // false
  },
  mounted() {
    console.log('mounted, this.$v.age.$dirty : ' + this.$v.age.$dirty) // false
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    age: {
      between: between(20, 40)
    },
    password: {
      required,
      minLength: minLength(8)
    },
    repassword: {
      sameAsPassword: sameAs('password')
    }
  },
  watch: {
    name() {
      console.log(this.$v) //改变input的值，查看$v的各个属性值的变化
      console.log(this.$v.name.$dirty) // true 在input框输入内容后$dirty变true
    }
  },
  methods: {
    // 设置年龄
    setAge(value) {
      this.submitTips = '';
      this.age = value;
      console.log('调用$touch方法之前：');
      console.log('this.$v.age.$dirty : ' + this.$v.age.$dirty);
      console.log(this.$v.age.$between);
      this.$v.age.$touch();
      console.log('调用$touch方法之后：');
      console.log('this.$v.age.$dirty : ' + this.$v.age.$dirty);
      console.log(this.$v.age.$between);
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitTips = '数据有错哟，请检查一下';
      } else {
        this.submitTips = '填写的内容已提交~';
      }
    }
  },
}
</script>

<style>
  #app {
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }
  input {
    margin-bottom: 30px;
    height: 30px;
    line-height: 30px;
  }
  label {
    width: 100px;
    margin-right: 30px;
  }
  .error {
    font-size: 0.75rem;
    line-height: 1;
    margin-left: 14px;
    margin-top: -1.6875rem;
    margin-bottom: 0.9375rem;
    color: rgb(245, 127, 108);
  }
</style>
