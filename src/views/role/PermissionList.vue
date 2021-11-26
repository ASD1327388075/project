<template>
  <div v-cloak>
    <el-card class="box-card">
      <div class="elinput clearfix">
        <el-input v-model="input" placeholder="请输入内容" clearable></el-input>
        <el-button
          icon="el-icon-search"
          class="marginLeft"
          id="resestFormButton"
          native-type="submit"
          @click="search"
        ></el-button>
        <el-button type="primary" @click="add">添加用户</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%; height: 100%" border>
        <el-table-column type="index" label="" width="80" align="center">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ProjectPermissionlist",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>


<style lang="less" scoped >
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.el-table {
  text-align: center;
}
.clearfix:after {
  content: ""; /*设置内容为空*/
  height: 0; /*高度为0*/
  line-height: 0; /*行高为0*/
  display: block; /*将文本转为块级元素*/
  visibility: hidden; /*将元素隐藏*/
  clear: both; /*清除浮动*/
}

.elinput {
  margin-bottom: 20px;
}
.elinput .el-input {
  float: left;
  width: 270px;
}
.elinput .el-button {
  float: left;
}

.marginLeft {
  float: left;
  margin-left: -1px;
  margin-right: 35px;
}

.el-dialog {
  padding: 0 30px;
}

.block {
  margin-top: 15px;
}

.alignLeft {
  text-align: left;
}
</style>