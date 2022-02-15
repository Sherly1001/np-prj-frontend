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
    path: '/home',
    component: Editor,
  },
  {
    path: '/login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});

export default router;
