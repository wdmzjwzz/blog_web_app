<template>
  <div class="add-content">
    <el-row>
      <el-col :span="22">
        <el-select v-model="category.value" class="create-select" placeholder="请选择分类">
          <el-option
            v-for="item in category.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <el-popover placement="bottom" width="400" v-model="visible" trigger="click">
          <span class="create-label">
            <span>名称：</span>
            <el-input v-model="labelname"></el-input>
            <el-button type="primary" @click="createLabel">添加</el-button>
          </span>
          <div v-for="item in category.options" :key="item.value" class="label-list">
            {{item.label}}
            <i class="iconfont icon-shanchu1" @click="deleteLabel(item.value)"></i>
          </div>
          <el-button slot="reference" type="primary" class="create-select">编辑分类</el-button>
        </el-popover>
      </el-col>
      <el-col :span="2">
        <el-button @click="createTopic" type="primary" class="create-button">发表</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" class="label">标题</el-col>
      <el-col :span="22">
        <el-input v-model="title"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" class="label">摘要</el-col>
      <el-col :span="22">
        <el-input v-model="overview" type="textarea" :rows="3" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2" class="label">内容</el-col>
      <el-col :span="22">
        <client-only>
          <mavon-editor
            v-model="value"
            ref="md"
            :ishljs="true"
            :toolbars="markdownOption"
            class="editer"
          />
        </client-only>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cookie from "../../assets/js/cookie";
export default {
  data() {
    return {
      title: "",
      value: "",
      visible: false,
      labelname: "",
      overview: "",
      category: {
        value: "",
        options: [],
      },
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空

        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    };
  },
  methods: {
    getselect() {
      let _this = this;
      this.$http.blog.menuList().then(function (response) {
        _this.category.options = [];
        response.result.forEach((element) => {
          _this.category.options.push({
            value: element.id,
            label: element.name,
          });
        });
        _this.$root.$emit("refresh",response.result);
      });
    },
    deleteLabel(id) {
      this.$http.blog.deleteLabel(id).then((res) => {
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
          this.getselect();
        }
      });
    },
    createTopic() {
      let params = {
        title: this.title,
        overview: this.overview,
        content: this.value,
        category: this.category.value,
      };
      this.$http.blog.create(params).then((res) => {
        if (res.code === 1) {
          this.$message({
            message: res.msg,
            type: "warning",
          });
        } else {
          this.$message({
            message: res.msg,
            type: "success",
          });
        }
      });
    },
    createLabel() {
      this.$http.blog
        .createLabel({
          name: this.labelname,
        })
        .then((res) => {
          if (res.code === 1) {
            this.$message({
              message: res.msg,
              type: "warning",
            });
          } else {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.visible = false;
            this.getselect();
          }
        });
    },
  },
  mounted() {
    this.getselect();
    // if (cookie.get("auth") !== "yes") {
    //   this.$router.push({
    //     path: "/",
    //   });
    // }
  },
};
</script>

<style lang="less" scoped>
.add-content {
  width: 1200px;
  min-height: 800px;

  margin: 0 auto;
  margin-top: 50px;
  padding: 30px;
  .el-row {
    margin-bottom: 50px;
  }
  .label {
    font-size: 18px;
    font-weight: bold;
  }
  .editer {
    height: 600px;
  }
  .create-select {
    float: right;
    margin-right: 20px;
  }
  .create-button {
    width: 100px;
    float: right;
  }
}
</style>
<style lang="less">
.create-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-input {
    width: 60%;
  }
}
.label-list {
  width: 100%;
  margin: 20px 0px;
  padding: 0px 60px;
  i {
    float: right;
    cursor: pointer;
  }
}
</style>