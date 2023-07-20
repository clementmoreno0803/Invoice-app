import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:id',
        name: 'InvoiceInfo',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "InvoiceInfo" */ '../views/InvoiceInfo.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router