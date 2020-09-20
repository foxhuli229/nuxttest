<template>
  <div class="goods container">
    <h3>我是商品页</h3>

    <nuxt-link to="/goods/1?a=1&b=1">商品1</nuxt-link><br>
    <nuxt-link to="/goods/2?a=2&b=2">商品2</nuxt-link><br>
    <nuxt-link :to="{path: '/goods/3', query: {a:3, b:3}}">商品3， path方式跳转</nuxt-link><br>
    <nuxt-link :to="{name: 'goods-id', query: {a:4, b:4}, params: {id: 4}}">商品4， name方式跳转</nuxt-link>
    <nuxt-link to="/goods/comment">商品-评论列表</nuxt-link>
    <!-- 命名视图 -->
    <nuxt />
  </div>
</template>

<script>
export default {
    validate() {
        return true;
    }
}
</script>

<style>
</style>