import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../pages/Home.vue'
import Create from '../pages/Create.vue'
import Monthly from '../pages/Monthly.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/monthly',
    name: 'Monthly',
    component: Monthly
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
