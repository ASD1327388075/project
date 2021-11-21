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
axios.defaults.timeout = 2500;
axios.defaults.baseURL = 'http://git.coding-future.com:8888/api/private/v1';

axios.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MzczMDQzNzEsImV4cCI6MTYzNzM5MDc3MX0.o6IV-BmxlwRqoDSgFurMrj3aztSVODB7LJ7LH2YVuCY"


Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
