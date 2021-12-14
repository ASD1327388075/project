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
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              :active-value="true"
              :inactive-value="false"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus($event, scope.row.id)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="caozuo" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="update(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleted(scope.row.id)"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="assignRole(scope.row, scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
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
    <!-- 添加用户弹出框 -->
    <!-- Form -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      class="eldialog"
      :close-on-click-modal="false"
    >
      <el-form :model="form" style="height: 100%" :rules="rules" ref="clear">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="用户密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('clear')">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户弹出框 -->
    <!-- Form -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisibleUpDate"
      class="eldialog"
      :close-on-click-modal="false"
    >
      <el-form
        :model="formUpDate"
        style="height: 100%"
        :rules="rules"
        ref="addUserForm"
      >
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="formUpDate.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formUpDate.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="formUpDate.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpDate">取 消</el-button>
        <el-button type="primary" @click="sureUpDate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色弹出框 -->
    <!-- Form -->
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisibleRole"
      class="eldialog"
      :close-on-click-modal="false"
    >
      <el-form
        :model="formAssign"
        style="height: 100%"
        ref="addUserForm"
        class="alignLeft"
      >
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            autocomplete="off"
            disabled
            v-model="formAssign.username"
          ></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input autocomplete="off" disabled v-model="formAssign.role_name">
          </el-input>
        </el-form-item>

        <el-form-item
          label="角色分配"
          :label-width="formLabelWidth"
          algin="left"
        >
          <el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"
            align
            clearable
            :props="customProps"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAssignRole">取 消</el-button>
        <el-button type="primary" @click="sureAssignRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ProjectUserlist",

  data() {
    return {
      // 搜索框
      input: "",
      // 级联选择器
      value: [],
      options: [],
      customProps: {
        label: "roleName",
        value: "id",
        children: null,
      },
      roleId: "",

      tableData: [],

      // 分页
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [2, 10, 15, 20],

      // 弹出框
      title: "",
      dialogFormVisible: false,
      dialogFormVisibleUpDate: false,
      dialogFormVisibleRole: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },

      // 编辑
      formUpDate: {
        username: "",
        email: "",
        mobile: "",
        id: 0,
      },

      // 分配
      formAssign: {
        id: 0,
        username: "",
        role_name: "",
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getTableData();
    this.getRole();
  },
  mounted() {},

  methods: {
    getTableData() {
      this.$axios
        .get("/users/", {
          params: {
            pagenum: this.currentPage,
            pagesize: this.pageSize,
          },
        })
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.tableData = res.data.data.users;
            this.total = res.data.data.total;
          } else {
          }
        });
    },
    // 点击添加用户弹出添加用户弹出框
    add() {
      this.title = "添加用户";
      this.dialogFormVisible = true;
    },
    // changed() {
    //   this.value = !this.value;
    // },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },

    // 弹出框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    handleClick(event) {
      let target = event.target;
      if (target.nodeName == "I") {
        target = event.target.parentNode;
      }
      target.blur();
    },
    // 弹出框确定
    sure() {
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post("/users", {
              username: this.form.username,
              password: this.form.password,
              email: this.form.email,
              mobile: this.form.mobile,
            })
            .then((res) => {
              if (res.data.meta.status === 201) {
                this.$message({
                  message: res.data.meta.msg,
                  type: "success",
                });
                this.dialogFormVisible = false;
                this.form = {};
                this.getTableData();
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: "warning",
                });
              }
            });
        } else {
          this.$message({
            message: "必填不能为空",
            type: "warning",
          });
        }
      });
    },

    // 删除
    deleted(id) {
      this.$confirm("确认删除？")
        .then((_) => {
          this.$axios.delete("/users/" + id).then((res) => {
            if (res.data.meta.status === 200) {
              this.$message({
                message: res.data.meta.msg,
                type: "success",
              });
              this.getTableData();
            } else {
              this.$message({
                message: res.data.meta.msg,
                type: "warning",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            message: "已取消",
            type: "warning",
          });
        });
    },

    // 修改状态
    changeStatus(status, id) {
      this.$axios.put("users/" + id + "/state/" + status).then((res) => {
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success",
          });
          this.getTableData();
        } else {
          this.$message({
            message: res.data.meta.msg,
            type: "error",
          });
        }
      });
    },

    // 弹出框取消
    cancel(clear) {
      this.form = {};
      this.dialogFormVisible = false;
    },

    cancelUpDate() {
      this.dialogFormVisibleUpDate = false;
    },

    // 编辑用户
    update(id) {
      this.title = "编辑用户";
      this.dialogFormVisibleUpDate = true;
      this.$axios.get("/users/" + id).then((res) => {
        if (res.data.meta.status === 200) {
          this.formUpDate.id = res.data.data.id;
          this.formUpDate.username = res.data.data.username;
          this.formUpDate.mobile = res.data.data.mobile;
          this.formUpDate.email = res.data.data.email;
        }
      });
    },
    sureUpDate() {
      this.$axios
        .put("users/" + this.formUpDate.id, {
          email: this.formUpDate.email,
          mobile: this.formUpDate.mobile,
        })
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success",
            });
            this.getTableData();
            this.dialogFormVisibleUpDate = false;
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: "warning",
            });
          }
        });
    },

    // 搜索
    search() {
      this.$axios
        .get("/users/", {
          params: {
            query: this.input,
            pagenum: this.currentPage,
            pagesize: this.pageSize,
          },
        })
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.tableData = res.data.data.users;
            this.total = res.data.data.total;
          } else {
          }
        });
      document.getElementById("resestFormButton").blur();
    },

    // 分配角色
    getRole() {
      this.$axios.get("/roles").then((res) => {
        this.options = res.data.data;
      });
    },
    assignRole(row, id) {
      this.formAssign.id = id;
      this.formAssign.username = row.username;
      this.formAssign.role_name = row.role_name;
      this.dialogFormVisibleRole = true;
    },
    cancelAssignRole() {
      this.dialogFormVisibleRole = false;
    },
    sureAssignRole() {
      console.log(this.formAssign.id);
      this.$axios
        .put("users/" + this.formAssign.id + "/role", {
          rid: this.roleId,
        })
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success",
            });
            this.getTableData();
            this.dialogFormVisibleRole = false;
            this.value = [];
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: "warning",
            });
          }
        });
    },

    // 级联选择器
    handleChange(value) {
      this.roleId = value;
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