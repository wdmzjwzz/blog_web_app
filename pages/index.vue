<template>
  <div class="home">
    <iframe src="/three/wanshiwu.html" frameborder="0" height="100%" width="100%" class="three-3d"></iframe>
  </div>
</template>

<script>
export default {
  
  head() {
    return {
      blogData: [],
    };
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  components: {},
  mounted() {
    // this.getblogList();
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  padding: 0 50px;
  display: flex;
  height: calc(100vh - 100px) ;
  .bg-white {
    background: rgba(225, 225, 225, 0.3);
  }
  .content {
    flex: 1;
    width: 80%;
    height: 90%;
  }
}
.three-3d{
  overflow: hidden;
}
@media (max-width: 750px) {
  .home {
    overflow: hidden;
  }
}
</style>
