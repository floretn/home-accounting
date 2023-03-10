import { createRouter, createWebHistory } from 'vue-router'
import {getAuth} from "firebase/auth"

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/HomeView.vue')
  },{
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('@/views/LoginView.vue')
  },{
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import('@/views/RegisterView.vue')
  },{
    path: '/categories',
    name: 'categories',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/CategoriesView.vue')
  },{
    path: '/detail-record/:id',
    name: 'detail-record',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/DetailRecordView.vue')
  },{
    path: '/history',
    name: 'history',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/HistoryView.vue')
  },{
    path: '/planning',
    name: 'planning',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/PlanningView.vue')
  },{
    path: '/profile',
    name: 'profile',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/ProfileView.vue')
  },{
    path: '/record',
    name: 'record',
    meta: {layout: 'main', auth: true},
    component: () => import('@/views/RecordView.vue')
  },{
    path: "/:pathMatch(.*)*",
    name: 'error',
    meta: {layout: 'main', auth: true},
    component: () => import("@/views/ErrorView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = getAuth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
