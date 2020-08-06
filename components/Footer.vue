<template>
  <footer>
    footer
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  computed: {
    mobile: function() {
      return this.isMobile;
    }
  }
};
</script>

<style lang="less" scoped>
footer {
 
}
</style>
<style lang="less" scoped>
@media (max-width: 750px) {
 
}
</style>