import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from "vue-router"
import axios from 'axios'
import vueAxios from 'vue-axios'


import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import Editor from './components/editor/Editor.vue'
import Login from './components/user/Login.vue'
import Register from './components/user/Register.vue'

import store from './store'

const routers = [
    {
        path: '/register',
        component: Register
    },
    {
        path: '/home',
        component: Editor
    },
    {
        path: '/login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routers
})

export default router;
// createApp(App).mount('#app');


const app = createApp(App)
app.use(router)
    .use(store)
    .use(vueAxios, axios)
    .mount('#app')