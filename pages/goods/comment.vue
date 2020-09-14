<template>
  <div class="goods-comment">
    <h3>我是商品-评论页</h3>

    <nuxt-link to="/goods/comment/1?a=1&b=1">商品-评论1-详情</nuxt-link>
    <nuxt-link to="/goods/comment/2?a=2&b=2">商品-评论2-详情</nuxt-link>
    <nuxt-link :to="{path: '/goods/comment/3', query: {a:3, b:3}}">商品-评论3-详情， path方式跳转</nuxt-link>
    <nuxt-link :to="{name: 'goods-comment-uid', query: {a:4, b:4}, params: {uid: 4}}">商品-评论4-详情， name方式跳转</nuxt-link>
    <nuxt />
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>