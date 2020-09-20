<template>
  <div class="userinfo">
    <h3>用户中心页</h3>
  </div>
</template>

<script>
export default {
  name: 'userinfo',
  middleware ({ route, store, params, query, redirect }) {
    console.log("middleware component 组件独享守卫");
  }
}
</script>

<style>
</style>