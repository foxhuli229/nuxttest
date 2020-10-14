<template>
  <div class="container">
    <div class="container">
      <div class="div1">
        <el-button type="primary">按钮</el-button>
        <span>{{ name }}</span>
      </div>
      <h2>跨域资源</h2>
      <br />
      <hr />
      <br />
      <ul>
        <li v-for="(item, index) in contList" :key="index">
          <div class="title">{{ item.Area }}</div>
          <div class="cont">{{ item.Area }} {{ index + 1 }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getListHomepage } from '~/api/user'
export default {
  //页面加载前执行
  middleware(context) {
    // console.log('middleware pages')
  },

  //参数的有效性验证
  validate({ params, query }) {
    //校验业务
    // console.log('validate')
    return true
  },
  //服务端,  没有window对象
  async asyncData() {
    console.log('server:', process.server)
    console.log('client:', process.client)
    //异步处理业务数据， 读取服务端数据，返回给 data
    const res = await getListHomepage()
    return {
      contList: res.Body.Data || [],
    }
  },

  //读取数据，返回给 vuex
  fetch({ store }) {
    //异步处理业务数据， 读取服务端数据，返回给 vuex
    // console.log('fech')
  },

  data() {
    return {
      name: '我是首页，默认显示首页我哦！！！',
      contList: [],
    }
  },
  mounted() {},
  methods: {},

  //CSR
  beforeCreate() {
    //在客户端和服务端都要打印
  },
  created() {},
}
</script>

<style  >
/* scoped 同样也生效 */
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

ul {
  margin-top: 24px;
}

ul li {
  text-decoration: none;
  padding: 10px;
}
</style>
