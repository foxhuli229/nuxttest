<template>
  <div class="goods-detail">
    <h3>商品详情页面</h3>
    <div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsDetail',
  validate({params, query}) {
    console.log("goods-id:",params, query);
    return typeof params.id === 'number' ? true : false;
  },
  data () {
    return {
      id: 0,
      query: '',
      params: ''
    }
  },
  created () {
   
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
  },
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