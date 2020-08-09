<template>
  <div class="add-content bg-white">
    <el-row>
      <el-col>标题</el-col>
      <el-col>
        <el-input v-model="title"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>内容</el-col>
      <el-col>
        <mavon-editor v-model="value"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title:"",
      value:""
    }
  }
};
</script>

<style lang="less" scoped>
.add-content {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}
</style>