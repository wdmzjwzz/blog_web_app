<template>
  <div :class="[lang]" class="defau">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  data() {
    return {
      unFixed: false
    }
  },
  components: { Header, Footer, ContactIcon },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    mobile() {
      return this.isMobile
    }
  },
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
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed(){
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="less" scoped>
.defau {
  position: relative;
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
