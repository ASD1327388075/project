<template>
  <div class="home">
    <el-container class="home_container">
      <el-header>
        <span class="white">后台管理系统</span>
        <el-button type="info" @click="loginOut">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '201px'">
          <div class="white" @click="change">|||</div>
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#373d3f"
            text-color="#fff"
            active-text-color="#f0f182"
            :unique-opened="true"
            :collapse-transition="true"
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
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "ProjectHome",

  data() {
    return {
      isCollapse: false,
    };
  },

  mounted() {},
  components: {},
  methods: {
    loginOut() {
      window.sessionStorage.clear();
      this.$router.push("/Login");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    change() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.home_container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #333742;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #323743;
  color: #333;
  text-align: center;
  line-height: 200px;
  text-align: left;
}

.el-main {
  background-color: #e9eef3;
  color: #333;

  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.box-card {
  height: 100%;
}
.white {
  color: white;
  font-size: 22px;
}
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
.white {
  background-color: #4a5064;
  color: white;
  text-align: center;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>