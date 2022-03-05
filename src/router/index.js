import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import create from '../components/create_component.vue'
import editar from '../components/edit_component.vue'
import listar from '../components/list_component.vue'

const routes = [
  {
    path: '/',
    name: 'listar',
    component: HomeView
  },
  {
    path: '/crear',
    name: 'crear',
    component: create
  },
  {
    path: '/editar',
    name: 'editar',
    component: editar
  },
  {
    path: '/listar',
    name: 'listar',
    component: listar
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
