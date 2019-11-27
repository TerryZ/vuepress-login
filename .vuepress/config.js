const nav = require('./navigator')
const sidebar = require('./sidebar')

module.exports = {
  title: 'VuePress with login',
  description: 'VuePress with login',
  themeConfig:{
    logo: '/logo.png',
    displayAllHeaders: true,
    nav: nav,
    sidebarDepth: 2,
    sidebar: sidebar,
    smoothScroll: true
  },
  markdown: {
    lineNumbers: true
  }
}