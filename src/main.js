import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

import 'normalize.css'
import './assets/css/style1.css'
import './assets/css/new style/style.css'
import './assets/css/user.css'
Vue.use(axios)
Vue.prototype.$http = axios
if(process.env.NODE_ENV === 'production'){
  axios.defaults.baseURL = 'https://newtodolist.herokuapp.com'
  
}
else{
  axios.defaults.baseURL = 'http://localhost:6050'
}
axios.defaults.withCredentials = true
// 添加请求拦截器

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  return config.data
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// axios.interceptors.response.use( (res) => {
//   console.log(res)
//   return res.data
// },(err) => {
//     console.log(err)
// })
// import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import '@mdi/font/css/materialdesignicons.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
