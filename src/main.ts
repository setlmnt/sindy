import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import Camera from 'simple-vue-camera'

const app = createApp(App)
app.use(router)
app.component('camera', Camera) // Registre o componente globalmente
app.mount('#app')
