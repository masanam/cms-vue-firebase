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
        name: 'product-list',
        path: 'product-list',
        component: () => import('../pages/product-list/ProductListPage.vue'),
      },
      {
        name: 'add-product-list',
        path: 'add-product-list',
        component: () => import('../pages/product-list/AddProductListPage.vue'),
      },
      {
        name: 'edit-product-list',
        path: 'edit-product-list/:id',
        component: () => import('../pages/product-list/EditProductListPage.vue'),
      },
      {
        name: 'testimony',
        path: 'testimony',
        component: () => import('../pages/testimony/TestimonyListPage.vue'),
      },
      {
        name: 'add-testimony',
        path: 'add-testimony',
        component: () => import('../pages/testimony/AddTestimonyListPage.vue'),
      },
      {
        name: 'edit-testimony',
        path: 'edit-testimony/:id',
        component: () => import('../pages/testimony/EditTestimonyListPage.vue'),
      },
      {
        name: 'faq-page',
        path: 'faq-page',
        component: () => import('../pages/faq-page/FaqListPage.vue'),
      },
      {
        name: 'add-faq-page',
        path: 'add-faq-page',
        component: () => import('../pages/faq-page/AddFaqListPage.vue'),
      },
      {
        name: 'edit-faq-page',
        path: 'edit-faq-page/:id',
        component: () => import('../pages/faq-page/EditFaqListPage.vue'),
      },
      {
        name: 'blog-page',
        path: 'blog-page',
        component: () => import('../pages/blog-page/BlogPage.vue'),
      },
      {
        name: 'add-blog-page',
        path: 'add-blog-page',
        component: () => import('../pages/blog-page/AddBlogPage.vue'),
      },
      {
        name: 'edit-blog-page',
        path: 'edit-blog-page/:id',
        component: () => import('../pages/blog-page/EditBlogPage.vue'),
      },
      {
        name: 'office-page',
        path: 'office-page',
        component: () => import('../pages/office-page/OfficePage.vue'),
      },
      {
        name: 'add-office-page',
        path: 'add-office-page',
        component: () => import('../pages/office-page/AddOfficePage.vue'),
      },
      {
        name: 'edit-office-page',
        path: 'edit-office-page/:id',
        component: () => import('../pages/office-page/EditOfficePage.vue'),
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
            component: () => import('../pages/global-list/GlobalListPage.vue'),
          },
          {
            name: 'edit-global-list',
            path: 'edit-global-list/:id',
            component: () => import('../pages/global-list/EditGlobalListPage.vue'),
          },
          {
            name: 'company-value',
            path: 'company-value',
            component: () => import('../pages/company-value/CompanyValuePage.vue'),
          },
          {
            name: 'edit-company-value',
            path: 'edit-company-value/:id',
            component: () => import('../pages/company-value/EditCompanyValuePage.vue'),
          },
          {
            name: 'ecosystem',
            path: 'ecosystem',
            component: () => import('../pages/ecosystem/EcoSystemPage.vue'),
          },
          {
            name: 'edit-ecosystem',
            path: 'edit-ecosystem/:id',
            component: () => import('../pages/ecosystem/EditEcoSystemPage.vue'),
          }
        ],
      },
      {
        name: 'about-us',
        path: 'about-us',
        component: RouteViewComponent,
        children: [
          {
            name: 'about-page',
            path: 'about-page',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-about-page',
            path: 'edit-about-page/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },
          {
            name: 'our-mission',
            path: 'our-mission',
            component: () => import('../pages/global-list/GlobalListPage.vue'),
          },
          {
            name: 'edit-our-mission',
            path: 'edit-our-mission/:id',
            component: () => import('../pages/global-list/EditGlobalListPage.vue'),
          },
          {
            name: 'company-overview',
            path: 'company-overview',
            component: () => import('../pages/global-list/GlobalListPage.vue'),
          },
          {
            name: 'edit-company-overview',
            path: 'edit-company-overview/:id',
            component: () => import('../pages/global-list/EditGlobalListPage.vue'),
          },
          {
            name: 'our-commitment',
            path: 'our-commitment',
            component: () => import('../pages/global-list/GlobalListPage.vue'),
          },
          {
            name: 'edit-our-commitment',
            path: 'edit-our-commitment/:id',
            component: () => import('../pages/global-list/EditGlobalListPage.vue'),
          },
        ],
      },
      {
        name: 'featured-product',
        path: 'featured-product',
        component: RouteViewComponent,
        children: [
          {
            name: 'product-page',
            path: 'product-page',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-product-page',
            path: 'edit-product-page/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },
        ],
      },
      {
        name: 'bussines-expand',
        path: 'bussines-expand',
        component: RouteViewComponent,
        children: [
          {
            name: 'business-page',
            path: 'business-page',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-business-page',
            path: 'edit-business-page/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },
          {
            name: 'achievement',
            path: 'achievement',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-achievement',
            path: 'edit-achievement/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },
          {
            name: 'our-gateway',
            path: 'our-gateway',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-our-gateway',
            path: 'edit-our-gateway/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },
          {
            name: 'our-support',
            path: 'our-support',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-our-support',
            path: 'edit-our-support/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },
          {
            name: 'packages',
            path: 'packages',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-packages',
            path: 'edit-packages/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },
        ],
      },
      {
        name: 'join-us',
        path: 'join-us',
        component: RouteViewComponent,
        children: [
          {
            name: 'join-page',
            path: 'join-page',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-join-page',
            path: 'edit-join-page/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },
        ],
      },
      {
        name: 'contact-us',
        path: 'contact-us',
        component: RouteViewComponent,
        children: [
          {
            name: 'contact-page',
            path: 'contact-page',
            component: () => import('../pages/frontpage/FrontPage.vue'),
          },
          {
            name: 'edit-contact-page',
            path: 'edit-contact-page/:id',
            component: () => import('../pages/frontpage/EditFrontPage.vue'),
          },
        ],
      },

      // {
      //   name: 'faq',
      //   path: '/faq',
      //   component: () => import('../pages/faq/FaqPage.vue'),
      // },
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
