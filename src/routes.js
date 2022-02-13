import Editor from './components/editor/Editor.vue'
import Home from './components/HelloWorld.vue'

import { createRouter, createWebHistory } from "vue-router"
const routeInfos = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: Editor
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routeInfos
})

export default router;