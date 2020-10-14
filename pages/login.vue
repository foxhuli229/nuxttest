<template>
  <div class="logins container">
    <h3>我是登录也, 同域资源</h3>
    <h4>采用内置的$axios请求方式</h4>
    {{ list }}
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      list: '',
    }
  },
  async asyncData({ $axios }) {
    let res = await $axios({ url: '/data/list.json' })
    // console.log('读取到的静态资源：', res)
    return {
      list: res.data,
    }
  },

  async fetch({ $axios }) {
    let res = await $axios({ url: '/data/list.json' })
    console.log('fetch: 读取到的静态资源：', res)
  },
}
</script>

<style>
</style>