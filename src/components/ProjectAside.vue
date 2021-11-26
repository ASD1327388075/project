<template >
  <div id="projectAside">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#373d3f"
      text-color="#fff"
      active-text-color="#f0f182"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">用户管理</span>
        </template>
        <router-link to="/userList"
          ><el-menu-item index="1-1">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item></router-link
        >
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">权限管理</span>
        </template>
        <router-link to="/roleList">
          <el-menu-item index="2-1">
            <i class="el-icon-menu"></i>
            <span slot="title">角色列表</span>
          </el-menu-item>
        </router-link>
        <router-link to="/permissionList">
          <el-menu-item index="2-2">
            <i class="el-icon-menu"></i>
            <span slot="title">权限列表</span>
          </el-menu-item>
        </router-link>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="3-1">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="4-1">
          <i class="el-icon-location">订单列表</i></el-menu-item
        >
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">数据统计</span>
        </template>
        <el-menu-item index="5-1">数据报表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "ProjectAside",
  data() {
    return { isCollapse: true };
  },

  mounted() {},

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

#projectAside {
  text-align: left;
}
.el-menu--popup {
  padding: 0;
}
</style>