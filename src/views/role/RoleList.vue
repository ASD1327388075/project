<template>
  <div v-cloak>
    <el-card class="box-card">
      <el-button type="primary" @click="add">添加角色</el-button>

      <el-table :data="tableData" style="width: 100%; height: 100%" border>
        <el-table-column type="index" label="#" width="80" align="center">
        </el-table-column>
        <el-table-column prop="username" label="角色名称" width="180">
        </el-table-column>
        <el-table-column prop="email" label="角色描述"> </el-table-column>
        <el-table-column prop="caozuo" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="update(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleted(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="assignRole(scope.row, scope.row.id)"
              >分配权限</el-button
            >
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
  name: "ProjectRolelist",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    getRoleList() {
      this.$axios.get("role").then((res) => {
        if (res.meta.status == 200) {
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>