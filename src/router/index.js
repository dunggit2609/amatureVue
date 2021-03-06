import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import LoggedIn from '@/components/LoggedIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/loggedin',
      name: 'LoggedIn',
      component: LoggedIn
    }
  ]
})
