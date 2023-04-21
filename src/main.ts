import '@arco-design/web-vue/dist/arco.less'

import ArcoVue from '@arco-design/web-vue'
import { persistQueryClient } from '@tanstack/query-persist-client-core'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import {
  VueQueryPlugin as query,
  type VueQueryPluginOptions
} from '@tanstack/vue-query'
import { createHead } from '@unhead/vue'
import { SchemaOrgUnheadPlugin as createSchema } from '@vueuse/schema-org'
import { addDays, addMinutes } from 'date-fns'
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

const queryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: addMinutes(0, 5).getTime(),
        cacheTime: addDays(0, 1).getTime(),
        retry: false,
        keepPreviousData: true,
        suspense: true
      }
    }
  },
  clientPersister: queryClient =>
    persistQueryClient({
      queryClient,
      persister: createSyncStoragePersister({
        storage: localStorage
      })
    })
}

app.use(pinia)
app.use(router)
app.use(head)
app.use(query, queryOptions)
app.use(ArcoVue)

app.mount('#app')
