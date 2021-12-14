<template>
  <div v-cloak>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%; height: 100%" border>
        <el-table-column type="index" label="#" width="80" align="center">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="">
        </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" v-if="scope.row.level == 1">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.level == 2">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ProjectPermissionlist",

  data() {
    return {
      // 权限列表
      tableData: [],
      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [2, 10, 15, 20],
    };
  },
  created() {
    this.getPermissionList();
  },
  mounted() {},

  methods: {
    getPermissionList() {
      this.$axios
        .get("/rights/list", {
          params: {
            pagenum: this.currentPage,
            pagesize: this.pageSize,
          },
        })
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.tableData = res.data.data;
            //  this.total = res.data.data.total;
          }
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getPermissionList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPermissionList();
    },
  },
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
.box-card {
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