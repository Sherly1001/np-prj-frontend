import { createRouter, createWebHashHistory } from 'vue-router';

import Editor from './components/editor/Editor.vue';
import Login from './components/user/Login.vue';
import Register from './components/user/Register.vue';

const routers = [
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/home/:file_id?',
    name: 'Home',
    component: Editor,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});

export default router;
