import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/css/rest.css'
import '../src/assets/iconfont/iconfont.css'
createApp(App)
.use(router)
.mount('#app')
