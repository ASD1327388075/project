<template>
  <div class="login">
    <!-- <input type="text" v-model="username" />
    <input type="text" v-model="password" />
    <button @click="login">登录</button>
    <img src="" alt=""> -->
    <el-card>
      <h3>登录</h3>
      <el-form :model="loginForm" label-width="80px" ref="loginFormRef">
        <el-form-item label="用户名">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login">登录</el-button>
      <el-button type="info" @click="loginFormRe('loginFormRef')"
        >重置</el-button
      >
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ProjectLogin",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/login", {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.meta.status === 200) {
            this.$message({
              message: "登陆成功",
              type: "success",
            });
            window.sessionStorage.setItem("token", res.data.data.token);
            this.$router.push({ name: "Home" });
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: "error",
            });
          }
        });
    },
    loginFormRe(loginFormRef) {
      this.$refs[loginFormRef].resetFields();
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fbfbfb;
}
.el-card {
  width: 450px;
}
</style>