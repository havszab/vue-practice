import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'ListItems',
      component: List
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
