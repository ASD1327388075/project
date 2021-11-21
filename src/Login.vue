<template>
  <div class="login">
    <input type="text" v-model="username" />
    <input type="text" v-model="password" />
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: "ProjectLogin",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/login/", {
          username: "admin",
          password: 123456,
        })
        .then((res) => {
          console.log(res);
          if (res.data.meta.status === 200) {
            this.$message({
              message: "登陆成功",
              type: "success",
            });
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: "error",
            });
          }
        });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.body {
}
.login {
}
</style>