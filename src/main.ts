import { createApp } from 'vue'
import './tailwind.css'
import App from './App.vue'
import { createHead } from '@vueuse/head'
import { router } from './lib/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
const head = createHead()

app.use(router).use(ElementPlus).use(head)
app.mount(document.body)
