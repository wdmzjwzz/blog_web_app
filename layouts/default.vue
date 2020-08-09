<template>
  <div class="defau">
    <Header />
    <nuxt />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  data() {
    return {
      unFixed: false,
      bgImg: "",
    };
  },
  components: { Header, Footer },
  computed: {},
  methods: {
    handleScroll(e) {
      let scroll = window.document.documentElement.scrollTop;
      let clientHeight = window.document.documentElement.clientHeight;
      let docHeight = document.body.scrollHeight;
      if (docHeight - scroll - clientHeight > 400) {
        this.unFixed = true;
      } else {
        this.unFixed = false;
      }
    },
  },
  beforeCreate() {
    if (process.client) {
      let img = new Image();
      img.src = "/img/bg1_a.jpg";
      let _this = this;
      img.onload = function () {};
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style lang="less" scoped>
.defau {
  height: 100%;
  
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: url("/img/bg1_a.jpg");
    // background: url('/img/bg1_a.jpg');
    background-repeat: no-repeat;
    z-index: -1;
  }
}
.un-fixed {
  position: absolute !important;
  bottom: 440px !important;
}
@media (max-width: 750px) {
  .defau {
    overflow: hidden;
  }
}
</style>
