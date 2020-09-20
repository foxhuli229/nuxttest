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