<template>
  <header>
    <nav>
      <ul class="header-menu">
        <li>
          <nuxt-link class="logo" to="/">首页</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isShowSubNav: false,
      navShow: false,
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect() {},
  },
  computed: {},
}
</script>

<style lang="less" scoped>
.header-menu{
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222222;
  li{
    a{
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
<style lang="less" scoped>
@media (max-width: 750px) {
}
</style>
