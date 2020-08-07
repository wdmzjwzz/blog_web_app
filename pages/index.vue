<template>
  <div class="home">index</div>
</template>

<script>
export default {
  head() {
    return {
      blogData: [],
    }
  },
  data() {
    return {}
  },
  methods: {
    getblogList() {
      this.$http.blog.getBlogsList().then((res) => {
        this.blogData = res.data
      })
    },
  },
  computed: {},
  components: {},
  mounted() {
    this.getblogList()
  },
}
</script>

<style lang="less" scoped>
.home {
  min-height: 500px;
}
@media (max-width: 750px) {
  .home {
    overflow: hidden;
  }
}
</style>
