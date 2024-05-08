import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '../src/assets/main.css'

import App from './App.vue'
import appRouter from './router'

const app = createApp(App)

app.use(createPinia())
app.use(appRouter)

app.mount('#app')
