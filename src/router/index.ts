import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import SignUp from '../components/SignUpForm.vue'
import RouteViewComponent from '../layouts/RouterBypass.vue'
import authGuard from './auth-guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'login' },
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { 
        path: 'sign-up', 
        component: SignUp
      }
    ],
  },
  {
    name: 'admin',
    path: '/',
    component: AppLayout,
    redirect: { name: 'dashboard' },
    // beforeEnter: authGuard,
    // meta: {
    //   requiresAuth: true,
    // },
      children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('../pages/settings/Settings.vue'),
      },
      {
        name: 'preferences',
        path: 'preferences',
        component: () => import('../pages/preferences/Preferences.vue'),
      },
      {
        name: 'users',
        path: 'users',
        component: () => import('../pages/users/UsersPage.vue'),
      },
      {
        name: 'latest-news',
        path: 'latest-news',
        component: () => import('../pages/latest-news/LatestNewsPage.vue'),
      },
      {
        name: 'edit-latest-news',
        path: 'edit-latest-news/:id',
        component: () => import('../pages/latest-news/EditNewsPage.vue'),
      },
      {
        name: 'add-latest-news',
        path: 'add-latest-news',
        component: () => import('../pages/latest-news/AddNewsPage.vue'),
      },
      {
        name: 'job-list',
        path: 'job-list',
        component: () => import('../pages/job-list/JobListPage.vue'),
      },
      {
        name: 'add-job-list',
        path: 'add-job-list',
        component: () => import('../pages/job-list/AddJobListPage.vue'),
      },
      {
        name: 'edit-job-list',
        path: 'edit-job-list/:id',
        component: () => import('../pages/job-list/EditJobListPage.vue'),
      },


      {
        name: 'projects',
        path: 'projects',
        component: () => import('../pages/projects/ProjectsPage.vue'),
      },
      {
        name: 'frontpage',
        path: 'frontpage',
        component: RouteViewComponent,
        children: [
          {
            name: 'hero-page',
            path: 'hero-page',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-hero-page',
            path: 'edit-hero-page/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },

          {
            name: 'global-list',
            path: 'global-list',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'company-value',
            path: 'company-value',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'ecosystem',
            path: 'ecosystem',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          }
          // {
          //   name: 'latest-news',
          //   path: 'latest-news',
          //   component: () => import('../pages/frontpage/FrontPage.vue'),
          // },

        ],
      },
      {
        name: 'faq',
        path: '/faq',
        component: () => import('../pages/faq/FaqPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/RecoverPassword.vue'),
      },
      {
        name: 'recover-password-email',
        path: 'recover-password-email',
        component: () => import('../pages/auth/CheckTheEmail.vue'),
      },
      {
        name: 'logout',
        path: '/logout',
        component: () => import('../pages/auth/Login.vue'),
      },

      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    name: '404',
    path: '/404',
    component: () => import('../pages/404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    authGuard(to, from, next);
  } else {
    next();
  }
});

export default router
