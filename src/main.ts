import '@arco-design/web-vue/dist/arco.less'

import ArcoVue from '@arco-design/web-vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { PiniaSharedState } from 'pinia-shared-state'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')

document.body.setAttribute(
  'arco-theme',
  prefersDarkMode.matches ? 'dark' : 'light'
)

prefersDarkMode.addEventListener('change', event => {
  document.body.setAttribute('arco-theme', event.matches ? 'dark' : 'light')
})

pinia.use(
  PiniaSharedState({
    type: 'native'
  })
)

app.use(pinia)
app.use(router)
app.use(head)
app.use(VueQueryPlugin)
app.use(ArcoVue)

app.mount('#app')
