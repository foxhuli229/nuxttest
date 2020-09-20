<template>
  <div class="reg container">
      <h3>我是注册页面</h3>
  </div>
</template>

<script>
export default {
  /**
   * 路由后置
   */
  beforeRouteLeave (to, from, next) {
    // ...
    let b1 = window.confirm("是否要离开");
    next()
  }
}
</script>

<style>

</style>