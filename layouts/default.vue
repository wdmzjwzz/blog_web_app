<template>
  <div class="defau">
    <img id="bg-img" src="/img/bg1_min.jpg" alt />
    <Header />
    <nuxt />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
if (process.client) {
  let img = new Image()
  img.src = '/img/bg1_a.jpg'
  let _this = this
  img.onload = (data) => {
    document.getElementById('bg-img').src = '/img/bg1_a.jpg'
    document.getElementById('bg-img').style.filter = 'blur(0px)'
  }
}
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
  created() {},
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

}
#bg-img {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  filter: blur(5px);
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
