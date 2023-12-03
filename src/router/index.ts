import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home.vue';
import Search from '../pages/Search.vue';
import Create from '../pages/Create.vue';
import Monthly from '../pages/Monthly.vue';
import Login from '../pages/Login.vue';
import { isAuthenticated } from '../services/auth.ts';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    meta: { requiresAuth: true }  // Esta rota requer autenticação
  },
  {
    path: '/monthly',
    name: 'Monthly',
    component: Monthly,
    meta: { requiresAuth: true }  // Esta rota requer autenticação
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    const isAuthenticatedUser = isAuthenticated();
    if (!isAuthenticatedUser) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
