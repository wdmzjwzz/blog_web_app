<template>
  <div class="home">
    <div class="">欢迎啊</div>
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
  position: absolute;
  width: 100%;
  padding: 0 50px;
  display: flex;

  .bg-white {
    background: rgba(225, 225, 225, 0.3);
  }
  .content {
    flex: 1;
    width: 80%;
    height: 90%;
  }
}
@media (max-width: 750px) {
  .home {
    overflow: hidden;
  }
}
</style>
