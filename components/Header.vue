<template>
  <header>
    <nuxt-link class="logo" :to="localePath('index')">
      <img src="../assets/img/redTheme/w-logo.svg" alt="Juzix-logo" />
    </nuxt-link>
    
  </header>
</template>

<script>
export default {
  data() {
    return {
      isShowSubNav: false,
      navShow: false //手机 菜单显示
    };
  },
  methods: {
  },
  computed: {
  }
};
</script>

<style lang="less" scoped>
header {
  
}
</style>
<style lang="less" scoped>


@media (max-width: 750px) {
  
}
</style>
