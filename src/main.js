import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import './assets/css/global.css';

Vue.use(ElementUI);


//axios配置
Vue.prototype.$axios = axios
axios.defaults.timeout = 8500;
axios.defaults.baseURL = 'http://git.coding-future.com:8888/api/private/v1';


//配置请求拦截器
axios.interceptors.request.use(config => {
  // console.log(config);
  // 配置token值
  config.headers.Authorization = window.sessionStorage.getItem("token")
  // 配置之后必须返回
  return config
})



Vue.config.productionTip = false


export default new Vue({
  state: {
    withChange: 0,
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
