# nuxt

[TOC]

## 1. 安装

```bash
npx create-nuxt-app 项目名
```

注意：其中 Choose rendering model Universal (SSR) 必须选择这个

## 2. 启动

```bash
npm run dev
```

## 3. 打包

```bash
npm run build
npm run start
```

## 4.生命周期

![image-20200914203755757](https://img-blog.csdnimg.cn/20200914233709438.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hpYW9odWxpX2h5cg==,size_16,color_FFFFFF,t_70#pic_center)

> 说明： 红色部分作为服务端，运行在客户端与服务端内。黄色部分：作为客户端，在服务端与客户端都在运行

### `1.nuxtServerInit(store, content)`

其中 store 包含了 vuex 的数据值

适配

### `2. middleware` 

中间件执行流程顺序： nuxt.config.js -> layouts 匹配布局 -> 匹配页面 pages

### `3.validate({params, query})`

服务端参数校验，通过后页面才会有数据，反之页面无法渲染,  传递的路由参数

### 4.`asyncData()`

读取数据，返回给组件 components，处理异步业务逻辑，读取服务端的数据，返回给 data， 无法取到 window 对象，在 vue 组件初始化之前，调用该方法

```js
async asyncData () {
    console.log('我是asyncData--------------')
    const res = await getListHomepage()
    return {
    contList: res.Body.Data || [],
   }
},
```

### 5. `fetch()`

读取服务端数据，返回给 vuex。

### 6. `asyncData()、 fetch()、 validate()`执行的先后顺序

validate() > asyncData() > fetch()

**注意： 服务端的钩子，是无法获取window对象，但是可以获取到 context**

### 7. vue 的生命钩子，服务端不支持 `activated()、 deactivated()`

### 8. 约定式路由

- 约定式路由

  - 展示视图: `<nuxt/>`

  - 生命式跳转:

    ```vue
    <nuxt-link to="/goods/1?a=1&b=1">商品1</nuxt-link>
    <nuxt-link to="/goods/2?a=2&b=2">商品2</nuxt-link>
    <nuxt-link
      :to="{ path: '/goods/3', query: { a: 3, b: 3 } }"
    >商品3， path方式跳转</nuxt-link>
    //name: 路由的name名称。路由名 = 目录名 + 文件名 // params: key键值名要等于
    文件名. 例如: 文件名为：_uid（必须由 下划线开头），则key = uid
    <nuxt-link
      :to="{ name: 'goods-id', query: { a: 4, b: 4 }, params: { id: 4 } }"
    >商品4， name方式跳转</nuxt-link>
    ```

  - 子路由

    目录文件夹代表：子路由，子路由内部 同级的文件，代表是同一级路由
    
  - 展示区层级控制
  
    | PATH           | FILE文件名                                                   |
    | -------------- | ------------------------------------------------------------ |
    | /              | index.vue                                                    |
    | /goods         | goods/index.vue                                              |
    | /goods/123     | goods/_id.vue                                                |
    | /goods/comment | goods/comment/index.vue(或 goods/comment.vue, 但是 comment下的文件夹一定要有 一个 index.vue页面，尽管是空的。) |
  
    pages/一级展示/二级展示
  
    		-  index.vue 会在一级展示
    		-  index.vue 空文档代表 默认页，不会寻找其他的 comment.vue详情页
  
- `exact-active-class` 严格匹配路由信息

![image-20200919201144698](C:\Users\86252\AppData\Roaming\Typora\typora-user-images\image-20200919201144698.png)

```vue
 <nav>
    <!-- 约定式导航 -->
    <nuxt-link to="/" exact-active-class="app_header--active">首页</nuxt-link>
    <nuxt-link to="/login" active-class="app_header--active">登录页</nuxt-link>
    <nuxt-link to="/reg" active-class="app_header--active">注册页</nuxt-link>
    <nuxt-link to="/userinfo" active-class="app_header--active">用户中心页</nuxt-link>
    <nuxt-link to="/goods" active-class="app_header--active">商品1</nuxt-link>
  </nav>
```

> 如果不适用严格路由的话，则默认 /为首页，无论点击那个nuxt-link，则都会被选中，反之不会

## 5. 扩展路由（自定义路由）

默认 / 路由为 首页，现将 /首页的path，更改为 /index ，操作步骤如下：

`exact-active-class` : 强制完全匹配路由，否则无论切换哪一个选项卡，则都会选中 首页，因此解决该问题，有2种方法：

```vue
  <nav>
    <!-- 约定式导航 -->
    <!-- <nuxt-link to="/" exact-active-class="app_header--active">首页</nuxt-link> -->
    <nuxt-link to="/index" active-class="app_header--active">首页</nuxt-link>
    <nuxt-link to="/login" active-class="app_header--active">登录页</nuxt-link>
    <nuxt-link to="/reg" active-class="app_header--active">注册页</nuxt-link>
    <nuxt-link to="/userinfo" active-class="app_header--active">用户中心页</nuxt-link>
    <nuxt-link to="/goods" active-class="app_header--active">商品1</nuxt-link>
  </nav>
```

- 方法一： 使用 `exact-active-class` 完全匹配

- 方法二：重置首页 路由path地址

   （1）将首页path：重置为: /index

   （2）在nuxt.config.js 中的routes中，写入

   ```js
   router: {
      middleware: 'auth',
      //扩展路由
      extendRoutes(routes, resolve) {
        routes.push({
          name: 'home',
          path: '/index',
          component: resolve(__dirname, 'pages/index.vue')
        })
      }
    }
   ```

   (3) 重启服务，即实现重置路由

## 6.重写错误error页

在 `layouts`目录下新建 error.vue(必须文件名是： error)，然后写对应的样式。error中可以 利用 `props`获取到 error的错误信息。

```vue
<template>
  <div class="error">
    <h1 v-if="error.statusCode">{{error.message}}</h1>
    <h1 v-else>应用发送异常</h1>
    <el-button @click="gohome">回到首页</el-button>
  </div>
</template>

<script>
export default {
  props: ['error'],
  methods: {
    gohome() {
      this.$router.replace("/index")
    }
  }
}
</script>

<style scoped>
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  height: 100vh;
}
</style>
```

## 7. CSS配置

css的相关文件统一存放在 `assets`目录下

- 在 `assets`文件夹下新建对应的css文件

- 然后在 nuxt.config.js 中的 CSS配置相关路径

  ```js
  css: ['element-ui/lib/theme-chalk/index.css', 'assets/css/transition.css'],
  ```

## 8.动画配置

全局路由动画配置

```css
//tranition.css

/* 路由统一动画 */
.page-enter-active, .page-leave-active {
    transition: opacity .5s;
}

/* 进入，退出效果 */
.page-enter, .page-leave-active {
    opacity: 0;
}
```

单个路由动画配置

```js
<script>
export default {
  name: 'goodsDetail',
  transition: 'goodsId', //自定义动画名
}
</script>

<style scoped>
/* 单个路由动画效果 */
.goodsId-enter-active, .goodsId-leave-active {
  transition: .5s ease all;
}
.goodsId-enter, .goodsId-leave-active {
  margin-left: -10000px;
}
</style>
```

## 9. 路由守卫

### 前置

 依赖中间件 middleware 插件

全局守卫：nuxt.config.js 指向 middleware

​					layouts定义中间件

组件独享守卫：

​					middleware

插件全局后置守卫

### 后置

使用vue的 `beforeRouteLeave`钩子

