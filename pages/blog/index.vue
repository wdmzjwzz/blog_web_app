<template>
  <div class="contents">
    <div v-for="item in blogData" :key="item.id" class="content-item">
      <h2>
        <nuxt-link :to="'/blog/'+item.id">{{item.title}}</nuxt-link>
      </h2>
      <div>{{item.overview}}</div>
      <div class="item-footer">{{moment(item.create_time).format('YYYY-MM-DD HH:mm')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    //请求
    let blogData
    let menuList
    await app.$http.blog.getBlogsList().then(function (response) {
      blogData = response.result
    })
    await app.$http.blog.menuList().then(function (response) {
      menuList = response.result
    })
    return { blogData: blogData, menuList: menuList }
  },
  props: {
    category: String,
  },
  head() {
    return {
      blogData: [],
    }
  },
  data() {
    return {
      timer: null,
      blogData: [],
    }
  },
  methods: {
    getblogList(index, indexPath) {
      let category = index
      let params = {
        category: category,
      }
      if (!category) {
        return
      }
      if (this.lock) {
        return
      }
      if (category === 'all') {
        params = null
      }
      this.lock = true
      this.$http.blog.getBlogsList(params).then((response) => {
        this.blogData = response.result
        this.lock = false
      })
    },
  },
  computed: {},
  components: {},
  created() {},
  mounted() {
    // this.getblogList();
    console.log(this.category, 44444444444)
  },
  watch: {
    category(val) {
      this.getblogList(val)
    },
  },
}
</script>

<style lang="less" scoped>
.contents {
  width: 100%;
  height: 100%;
  padding: 20px;
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
</style>
