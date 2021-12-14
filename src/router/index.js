import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/Login.vue')
  }, {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/Home.vue'),
    children: [
      {
        path: '/userList',
        name: 'UserList',
        component: () => import(/* webpackChunkName: "userList" */ '@/views/users/UserList.vue')
      },
      {
        path: '/roleList',
        name: 'RoleList',
        component: () => import(/* webpackChunkName: "roleList" */ '@/views/role/RoleList.vue')
      },
      {
        path: '/permissionList',
        name: 'PermissionList',
        component: () => import(/* webpackChunkName: "permissionList" */ '@/views/role/PermissionList.vue')
      }
    ]

  },
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from代表从哪个路径跳转而来
  // next（）是一个函数
  // next()表示放行，next（"/login"）表示强制跳转到登录页
  if (to.path === "/login") {
    return next()
  } //如果用户访问登录页，直接放行
  const tokenStr = window.sessionStorage.getItem("token") //如果不是登录页先获取token
  if (!tokenStr) {
    return next("/login")
  } // 如果用户不是登录，而是通过路径跳转，强制跳转login页
  next() //用户正常登录页面，放行
})

export default router
