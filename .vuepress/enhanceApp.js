import Dialog from 'v-dialogs'
import { checkAuth } from './login/helper'
import Login from './login/Login'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  // Install v-dialogs
  Vue.use(Dialog)

  router.beforeEach((to, from, next) => {
    if (checkAuth()) {
      next()
    } else {
      router.app.$dlg.modal(Login, {
        width: 300,
        height: 350,
        title: 'Employee login',
        singletonKey: 'employee-login',
        maxButton: false,
        closeButton: false,
        callback: data => {
          if (data === true) {
            next()
          }
        }
      })
    }
  })
}