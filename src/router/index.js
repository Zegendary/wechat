import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import viewCalendarRouter from './viewCalendarRouter'
import statisticsRouter from './statisticsRouter'
import editAllPriceRouter from './editAllPriceRouter'
import editPriceRouter from './editPriceRouter'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      redirect: { name: 'Login' }
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    ...viewCalendarRouter,
    ...statisticsRouter,
    ...editAllPriceRouter,
    ...editPriceRouter,
  ],
  mode: 'history'
})
