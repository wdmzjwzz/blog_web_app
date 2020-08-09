<template>
  <div class="add-content bg-white">
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
        <mavon-editor v-model="value" ref="md" class="editer" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
  },
};
</script>

<style lang="less" scoped>
.add-content {
  width: 1200px;
  min-height: 1200px;

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
    height: 880px;
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