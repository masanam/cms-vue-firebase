export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'blog-page',
      displayName: 'menu.blog-page',
      meta: {
        icon: 'vuestic-iconset-files',
      },
    },
    {
      name: 'job-list',
      displayName: 'menu.job-list',
      meta: {
        icon: 'vuestic-iconset-files',
      },
    },
    {
      name: 'product-list',
      displayName: 'menu.product-list',
      meta: {
        icon: 'vuestic-iconset-files',
      },
    },
    {
      name: 'testimony',
      displayName: 'menu.testimony',
      meta: {
        icon: 'vuestic-iconset-files',
      },
    },
    {
      name: 'faq-page',
      displayName: 'menu.faq-page',
      meta: {
        icon: 'vuestic-iconset-files',
      },
    },
    {
      name: 'office-page',
      displayName: 'menu.office-page',
      meta: {
        icon: 'vuestic-iconset-files',
      },
    },


    // {
    //   name: 'users',
    //   displayName: 'menu.users',
    //   meta: {
    //     icon: 'group',
    //   },
    // },
    {
      name: 'frontpage',
      displayName: 'menu.frontpage',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'hero-page',
          displayName: 'menu.hero-page',
        },
        {
          name: 'global-list',
          displayName: 'menu.global-list',
        },

        {
          name: 'company-value',
          displayName: 'menu.company-value',
        },
        {
          name: 'ecosystem',
          displayName: 'menu.ecosystem',
        },
        {
          name: 'topbar',
          displayName: 'menu.topbar',
        },

      ],
    },
    {
      name: 'about-us',
      displayName: 'menu.about-us',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'about-page',
          displayName: 'menu.about-page',
        },
        {
          name: 'our-mission',
          displayName: 'menu.our-mission',
        },
        {
          name: 'company-overview',
          displayName: 'menu.company-overview',
        },

        {
          name: 'our-commitment',
          displayName: 'menu.our-commitment',
        },
      ],
    },
    {
      name: 'featured-product',
      displayName: 'menu.featured-product',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'product-page',
          displayName: 'menu.product-page',
        },
      ],
    },
    {
      name: 'business-expand',
      displayName: 'menu.business-expand',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'business-page',
          displayName: 'menu.business-page',
        },
        {
          name: 'achievement',
          displayName: 'menu.achievement',
        },
        {
          name: 'our-product',
          displayName: 'menu.our-product',
        },

        {
          name: 'our-gateway',
          displayName: 'menu.our-gateway',
        },
        {
          name: 'our-support',
          displayName: 'menu.our-support',
        },
        {
          name: 'packages',
          displayName: 'menu.packages',
        },
      ],
    },
    {
      name: 'join-us',
      displayName: 'menu.join-us',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'join-page',
          displayName: 'menu.join-page',
        },
      ],
    },
    {
      name: 'contact-us',
      displayName: 'menu.contact-us',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'contact-page',
          displayName: 'menu.contact-page',
        },
        {
          name: 'contact-data',
          displayName: 'menu.contact-data',
        },

      ],
    },

    // {
    //   name: 'auth',
    //   displayName: 'menu.auth',
    //   meta: {
    //     icon: 'login',
    //   },
    //   children: [
    //     {
    //       name: 'login',
    //       displayName: 'menu.login',
    //     },
    //     {
    //       name: 'signup',
    //       displayName: 'menu.signup',
    //     },
    //     {
    //       name: 'recover-password',
    //       displayName: 'menu.recover-password',
    //     },
    //   ],
    // },

    // {
    //   name: 'faq',
    //   displayName: 'menu.faq',
    //   meta: {
    //     icon: 'quiz',
    //   },
    // },
    // {
    //   name: '404',
    //   displayName: 'menu.404',
    //   meta: {
    //     icon: 'vuestic-iconset-files',
    //   },
    // },
    // {
    //   name: 'preferences',
    //   displayName: 'menu.preferences',
    //   meta: {
    //     icon: 'manage_accounts',
    //   },
    // },
    // {
    //   name: 'settings',
    //   displayName: 'menu.settings',
    //   meta: {
    //     icon: 'settings',
    //   },
    // },
  ] as INavigationRoute[],
}
