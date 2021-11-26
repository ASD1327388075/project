<template>
  <div class="home">
    <el-container class="home_container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="201px"><projectAside></projectAside></el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import projectAside from "@/components/ProjectAside";
export default {
  name: "ProjectHome",

  data() {
    return {};
  },

  mounted() {},
  components: { projectAside },
  methods: {},
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
}

.el-aside {
  background-color: #323743;
  color: #333;
  text-align: center;
  line-height: 200px;
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
</style>