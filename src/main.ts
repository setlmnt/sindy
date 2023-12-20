import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import Camera from 'simple-vue-camera'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App)
app.use(router)
app.component('camera', Camera)
app.use(VCalendar, {})
app.mount('#app')
