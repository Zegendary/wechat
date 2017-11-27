// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Qs from 'qs'
import App from './App'
import router from './router'
import axios from 'axios'
import { Button, Collapse, CollapseItem, Icon, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Icon)
Vue.config.productionTip = false
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


Vue.prototype.$http = axios

Vue.prototype.$message = Message

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
