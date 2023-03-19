import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { PiniaSharedState } from 'pinia-shared-state'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(
  PiniaSharedState({
    type: 'native'
  })
)

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
