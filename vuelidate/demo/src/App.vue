<template>
  <div id="app">
    <form>
      <label for="username">姓名</label>
      <input type="text" placeholder="请输入姓名" id="username" name="name" v-model.trim="$v.name.$model" />
      <div class="error" v-if="$v.name.$dirty && !$v.name.required">请输入姓名</div>
      <div class="error" v-if="!$v.name.minLength">至少 {{$v.name.$params.minLength.min}} 个字符.</div>
    </form>
  </div>
</template>

<script>

// 引入要用到的校验规则
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'app',
  data() {
    return {
      name: '',
    }
  },
  beforeCreate() {
    console.log(this.$v) //undefined
  },
  created() {
    console.log(this.$v)
    console.log(this.$v.name.$dirty)
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    }
  },
  watch: {
    name() {
      console.log(this.$v)
      console.log(this.$v.name.$dirty)
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
