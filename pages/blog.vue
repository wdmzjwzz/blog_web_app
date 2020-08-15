<template>
  <div class="blog">
    <div class="bg-white left-menu">
      <el-menu
        default-active="all"
        class="el-menu-vertical"
        background-color="transparent"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="getblogList"
      >
        <el-menu-item index="all">
          <i class="iconfont icon-list"></i>
          <span slot="title">全部</span>
        </el-menu-item>
        <el-menu-item
          :index="item.id+''"
          v-for="item in menuList"
          :key="item.id"
          :data-menuid="item.id"
        >
          <i class="iconfont icon-wenjian"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="bg-white content">
      <nuxt-child :category="category" />
    </div>
    <div class="bg-white right">
      <robot />
    </div>
  </div>
</template>

<script>
import robot from '../components/robot'
export default {
  async asyncData({ app, params }) {
    //请求
    let menuList

    await app.$http.blog.menuList().then(function (response) {
      menuList = response.result
    })
    return { menuList: menuList }
  },
  head() {
    return {}
  },
  data() {
    return {
      timer: null,
      menuList: [],
      category: 'all',
    }
  },
  methods: {
    getblogList(index, indexPath) {
      this.category = index
    },
  },
  computed: {},
  components: { robot },
  created() {},
  mounted() {
    this.$root.$on('refresh', (options) => {
      this.menuList = options
    })
  },
}
</script>
<style lang="less">
.el-menu-vertical {
  border-right: none;
  .el-menu-item {
    font-size: 18px;
    &:hover {
      color: #ffd04b !important;
      background-color: transparent !important;
      i {
        color: #ffd04b !important;
      }
      span {
        cursor: pointer;
      }
    }
    i {
      color: #ffffff;
    }
  }
  .is-active {
    i {
      color: #ffd04b;
    }
  }
}
</style>
<style lang="less" scoped>
.blog {
  width: 100%;
  padding: 0 50px;
  display: flex;
  height: calc(100vh - 100px);
  .left-menu {
    width: 20%;
    height: 100%;
    margin-right: 30px;
    padding: 20px;
  }
  .content {
    flex: 1;
    width: 60%;
    height: 100%;
    padding: 20px;
    margin-right: 30px;
    overflow-y: auto;
    .content-item {
      background: #ffffff;
      border-radius: 5px;
      margin-bottom: 20px;
      padding: 20px;
      h2 {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .item-footer {
        margin-top: 20px;
        padding-top: 10px;
        font-size: 12px;
        border-top: 1px solid #dcdcdc;
      }
    }
  }
  .right {
    width: 20%;
    height: 100%;
  }
}
@media (max-width: 750px) {
  .home {
    overflow: hidden;
  }
}
</style>
