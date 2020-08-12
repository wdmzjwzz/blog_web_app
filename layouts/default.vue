<template>
  <div class="defau" :class="{'loaded':loaded}">
    <Header />
    <nuxt />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  data() {
    return {
      unFixed: false,
      bgImg: '',
      loaded: false,
    }
  },
  components: { Header, Footer },
  computed: {},
  methods: {
    handleScroll(e) {
      let scroll = window.document.documentElement.scrollTop
      let clientHeight = window.document.documentElement.clientHeight
      let docHeight = document.body.scrollHeight
      if (docHeight - scroll - clientHeight > 400) {
        this.unFixed = true
      } else {
        this.unFixed = false
      }
    },
  },
  created() {
    if (process.client) {
      let img = new Image()
      img.src = '/img/bg1_a.jpg'
      let _this = this
      img.onload = () => {
        _this.loaded = true
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
<style lang="less" scoped>
.defau {
  height: 100%;
  padding-bottom: 50px;
  background: url('/img/bg1_min.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px);
}
.loaded {
  background: url('/img/bg1_a.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(0px);
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
