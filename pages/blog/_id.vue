<template>
  <div class="blog-detail">
    <h2 class="title">{{blogData.title}}</h2>
    <span class="time">
      <span>{{blogData.user_name}}</span>
      {{moment(blogData.create_time).format('YYYY-MM-DD HH:mm')}}
    </span>
    <div class="blog-detail-content" v-html="content"></div>
    <i class="iconfont icon-shanchu1 deleted" v-if="isDelete" @click="deletetopic"></i>
  </div>
</template>

<script>
import marked from "marked";
import cookie from "../../assets/js/cookie";
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, language) {
    const hljs = require("highlight.js");
    const validLanguage = hljs.getLanguage(language) ? language : "plaintext";

    return hljs.highlight(validLanguage, code).value;
  },
  pedantic: false,
  gfm: false,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

export default {
  async asyncData({ app, params }) {
    //请求
    let blogData;

    await app.$http.blog.getBlogById(params.id).then(function (response) {
      blogData = response.result;
    });

    return { blogData: blogData };
  },
  data() {
    return {
      blogData: {},
      isDelete: false,
    };
  },
  methods: {
    deletetopic() {
      this.$http.blog.deleteblog(this.$route.params.id).then((res) => {
        if (res.code === 1) {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        } else {
          this.$message({
            message: res.result,
            type: "success",
          });
          this.$router.push({
            path: "/blog",
          });
        }
      });
    },
  },
  created() {
    this.content = marked(this.blogData.content).replace(
      /language-javascript/g,
      "hljs javascript"
    );
  },
  mounted() {
    if (cookie.get("auth") === "yes") {
      this.isDelete = true;
    } else {
      this.isDelete = false;
    }
  },
};
</script>

<style lang="less" scoped>
.blog-detail {
  padding: 20px;
  width: 100%;
  height: 100%;
  min-height: 500px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: relative;
  .deleted {
    position: absolute;
    right: 20px;
    top: 120px;
    font-size: 20px;
    cursor: pointer;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .time {
    display: block;
    font-size: 12px;
    margin: 20px 0;
    color: #333333;
    padding-bottom: 14px;
    span {
      margin-right: 14px;
    }
    border-bottom: 1px solid #dddddd;
  }
  .blog-detail-content {
  }
}
</style>