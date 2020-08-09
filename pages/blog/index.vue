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
      <div v-for="item in blogData" :key="item.id" class="content-item">
        <h2>
          <nuxt-link :to="'/blog/'+item.id">{{item.title}}</nuxt-link>
        </h2>
        <div>{{item.overview}}</div>
        <div class="item-footer">{{moment(item.create_time).format('YYYY-MM-DD HH:mm')}}</div>
      </div>
    </div>
    <div class="bg-white right"></div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    //请求
    let blogData;
    let menuList;
    await app.$http.blog.getBlogsList().then(function (response) {
      blogData = response.result;
    });
    await app.$http.blog.menuList().then(function (response) {
      menuList = response.result;
    });
    return { blogData: blogData, menuList: menuList };
  },
  head() {
    return {
      blogData: [],
    };
  },
  data() {
    return {
      timer: null,
      blogData: [],
    };
  },
  methods: {
    getblogList(index, indexPath) {
      let category = index;
      let params = {
        category: category,
      };
      if (!category) {
        return;
      }
      if (this.lock) {
        return;
      }
      if (category === "all") {
        params = null;
      }
      this.lock = true;
      this.$http.blog.getBlogsList(params).then((response) => {
        this.blogData = response.result;
        this.lock = false;
      });
    },
  },
  computed: {},
  components: {},
  created() {},
  mounted() {
    // this.getblogList();
  },
};
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
  position: absolute;
  height: calc(100% - 50px) ;
  width: 100%;
  padding: 0 50px;
  display: flex;

 
  .left-menu {
    width: 20%;
    height: 90%;
    margin-right: 30px;
    padding: 20px;
  }
  .content {
    flex: 1;
    width: 60%;
    height: 90%;
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
    height: 90%;
    padding: 50px;
  }
}
@media (max-width: 750px) {
  .home {
    overflow: hidden;
  }
}
</style>
