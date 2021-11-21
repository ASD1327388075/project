<template>
  <div>
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%; height: 100%" border>
        <el-table-column type="index" label="" width="80" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              :active-value="true"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="caozuo" label="操作">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <span class="demonstration">完整功能</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[2, 10, 20, 30]"
          :page-size="100"
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
  name: "ProjectUserlist",

  data() {
    return {
      tableData: [],
      value: true,

      // 分页
      total: 0,
      currentPage4: 1,
    };
  },
  created() {
    this.getTableData();
  },
  mounted() {},

  methods: {
    getTableData() {
      this.$axios
        .get("/users/", {
          params: {
            pagenum: 1,
            pagesize: 10,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            this.tableData = res.data.data.users;
            this.total = res.data.data.total;
          } else {
          }
        });
    },
    changed() {
      this.value = !this.value;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="less" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.el-table {
  text-align: center;
}
</style>