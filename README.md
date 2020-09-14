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

![image-20200914203755757](C:\Users\86252\AppData\Roaming\Typora\typora-user-images\image-20200914203755757.png)



> 说明： 红色部分作为服务端，运行在客户端与服务端内。黄色部分：作为客户端，在服务端与客户端都在运行

### `1.nuxtServerInit(store, content)`

其中store包含了 vuex 的数据值

适配



### `2. middleware`

中间件执行流程顺序： nuxt.config.js  -> layouts 匹配布局 -> 匹配页面 pages



### `3.validate({params, query})`

服务端参数校验，通过后页面才会有数据，反之页面无法渲染



###  4.`asyncData()`

读取数据，返回给组件 components，处理异步业务逻辑，读取服务端的数据，返回给 data， 无法取到 window对象，在vue组件初始化之前，调用该方法

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



### 7. vue的生命钩子，服务端不支持 `activated()、 deactivated()`



### 8. 约定式路由

- 约定式路由

  - 展示视图: `<nuxt/>`

  - 生命式跳转: 

    ```vue
    
    <nuxt-link to="/goods/1?a=1&b=1">商品1</nuxt-link>
    <nuxt-link to="/goods/2?a=2&b=2">商品2</nuxt-link>
    <nuxt-link :to="{path: '/goods/3', query: {a:3, b:3}}">商品3， path方式跳转</nuxt-link>
    //name: 路由的name名称。路由名 = 目录名 + 文件名
    // params: key键值名要等于 文件名. 例如: 文件名为：_uid（必须由 下划线开头），则key = uid
    <nuxt-link :to="{name: 'goods-id', query: {a:4, b:4}, params: {id: 4}}">商品4， name方式跳转</nuxt-link>
    ```
    
  - 子路由
    
    目录文件夹代表：子路由，子路由内部 同级的文件，代表是同一级路由

