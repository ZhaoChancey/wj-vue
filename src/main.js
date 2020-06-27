import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import './assets/icon/iconfont.css'

Vue.config.productionTip = false

// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

/*
用动态路由，判断用户是否登录跳转登录页面还是主页面，判断管理员权限，判断页面是否存在，不存在跳转404页面，
beforeEach函数有三个参数：
to:router即将进入的路由对象
from:当前导航即将离开的路由
next:Function,进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed （确认的）；否则为false，终止导航。
 */
router.beforeEach((to, from, next) => {
  // 要访问的路径需要登录
  if (to.meta.requireAuth) {
    // 需要登录
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath} // 存储访问的页面路径（以便在登录后直接跳转到访问页）
      })
    }
    // 要访问的路径不需要登录
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // 注意这里
  store,
  components: {App},
  template: '<App/>'
  // 把vue实例挂载到#app这个id对应的DOM中
}).$mount('#app')
