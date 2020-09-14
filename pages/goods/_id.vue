<template>
  <div class="goods-detail">
    <h3>商品详情页面 {{id}}</h3>
    <div>
      {{query}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: 0,
      query: '',
      params: ''
    }
  },
  created () {
    this.id = this.$route.params.id; //params 参数就是 _id值
    this.query = this.$route.query
    if (this.query) {
      this.query = JSON.stringify(this.query)
    }
  },
  watch: {
    '$route.path': {
      handler (val) {
        this.id = this.$route.params.id || -1; //params 参数就是 _id值
        this.query = this.$route.query
        if (this.query) {
          this.query = JSON.stringify(this.query)
        }
      }
    }
  }
}
</script>

<style>
</style>