import { VueQueryPlugin } from '@tanstack/vue-query'
import { createHead } from '@vueuse/head'
import { SchemaOrgUnheadPlugin as createSchema } from '@vueuse/schema-org'
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

head.use(
  createSchema(
    {
      host: 'https://zeepki.st'
    },
    () => {
      const route = router.currentRoute.value
      return {
        path: route.path,
        ...route.meta
      }
    }
  )
)

app.use(pinia)
app.use(router)
app.use(head)
app.use(VueQueryPlugin)

app.mount('#app')
