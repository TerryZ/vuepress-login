# vuepress-login

Add user authorization for VuePress

<template>
<button type="button" @click="clear">Clear login status</button>
</template>

## Examples

Live examples in below sites

- [github.io](https://terryz.github.io/vuepress-login)
- [gitee.io](https://terryz.gitee.io/vuepress-login)

Enter any username and password for experience

## Source code

Please visit [https://github.com/TerryZ/vuepress-login](https://github.com/TerryZ/vuepress-login)

## Install plugin

Install `v-dialogs` plugin for Modal dialog

```
# npm
npm i v-dialogs -D

# yarn
yarn add -D v-dialogs
```

## Create login form file

Add `Login.vue` file for login form, display in Modal dialog

```vue
<template>
  <div class="login-form">
    <div class="form-header">User Name</div>
    <div>
      <input type="text" class="form-control" v-model="username">
    </div>
    <div class="form-header">Password</div>
    <div>
      <input type="password" class="form-control" v-model="password">
    </div>

    <div class="btn-row">
      <button class="btn" @click="login">
        OK
      </button>
    </div>
  </div>
</template>

<script>
import { STORAGE_KEY } from './helper'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.username && this.password) {
        const data = JSON.stringify({
          name: this.username,
          time: new Date().getTime()
        })
        window.localStorage.setItem(STORAGE_KEY, data)
        this.$emit('close', true)
      } else {
        this.$dlg.alert('Please complete the content', {
          messageType: 'warning'
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.login-form
  padding: 1rem
  display flex
  flex-direction column
  box-sizing border-box
  .btn-row
    margin-top 1rem
  .btn
    padding 0.6rem 2rem
    outline none
    background-color #60C084
    color white
    border 0
  .form-header
    color #666
    margin-bottom 0.5rem
  .form-control
    padding 0.6rem
    border 2px solid #ddd
    width 100%
    margin-bottom 0.5rem
    box-sizing border-box
    outline none
    transition border 0.2s ease
    &:focus
      border 2px solid #aaa
</style>
```

## Configuration VuePress

Add `enhanceApp.js` file in `/.vuepress`

```js
import { checkAuth } from './login/helper'
import Login from './login/Login'

export default ({
  Vue,
  options,
  router,
  siteData
}) => {
  Vue.mixin({
    mounted() {
      const doCheck = () => {
        if (!checkAuth()) {
          this.$dlg.modal(Login, {
            width: 300,
            height: 350,
            title: 'Employee login',
            singletonKey: 'employee-login',
            maxButton: false,
            closeButton: false,
            callback: data => {
              if (data === true) {
                // do some stuff after login
              }
            }
          })
        }
      }

      if (this.$dlg) {
        doCheck()
      } else {
        import('v-dialogs').then(resp => {
          Vue.use(resp.default)
          this.$nextTick(() => {
            doCheck()
          })
        })
      }
    }
  })
}
```
Will do user authorization verify in every document

- If not authorized, show login Modal dialog
- If authorized, going to visit vuepress documentation

<script>
export default {
  methods: {
    clear () {
      window.localStorage.clear()
      alert('User login status has been cleared!');
    }
  }
}
</script>