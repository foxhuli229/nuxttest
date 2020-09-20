<template>
  <nav>
    <!-- 约定式导航 -->
    <!-- <nuxt-link to="/" exact-active-class="app_header--active">首页</nuxt-link> -->
    <nuxt-link to="/index" active-class="app_header--active">首页</nuxt-link>
    <nuxt-link to="/login" active-class="app_header--active">登录页</nuxt-link>
    <nuxt-link to="/reg" active-class="app_header--active">注册页</nuxt-link>
    <nuxt-link to="/userinfo" active-class="app_header--active">用户中心页</nuxt-link>
    <nuxt-link to="/goods" active-class="app_header--active">商品1</nuxt-link>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.app_header--active {
    background: #3e3e;
    color: #fff;
}
</style>