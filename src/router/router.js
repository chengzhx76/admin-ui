import Layout from '@/views/layout/Layout'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/views/login')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/dashboard',
  component: Layout,
  children: [
    {
      path: 'dashboard',
      name: 'dashboard_home',
      meta: {
        title: '首页',
        noCache: true
      },
      component: () => import('@/views/dashboard/home')
    },
    {
      path: 'own-space',
      name: 'ownSpace',
      meta: {
        title: '个人中心',
        noCache: true
      },
      component: () => import('@/views/ownSpace')
    },
    {
      path: 'test',
      name: 'test',
      meta: {
        title: '小组件',
        noCache: true
      },
      component: () => import('@/views/dashboard/Test')
    }
  ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/user',
    name: 'user',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: 'people',
      roles: ['admin']
    },
    children: [
      {
        path: 'add',
        name: 'user_add',
        component: () => import('@/views/user/Add'),
        meta: {
          title: '添加用户',
          roles: ['admin']
        }
      },
      {
        path: 'list',
        name: 'user_list',
        component: () => import('@/views/user/List'),
        meta: {
          title: '用户列表',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/test',
    name: 'testPage',
    component: Layout,
    meta: {
      title: '权限测试',
      icon: 'lock',
      roles: ['admin','editor']
    },
    children: [
      {
        path: 'all',
        name: 'testPage_all',
        component: () => import('@/components/Test'),
        meta: {
          title: '权限-all',
          roles: ['admin','editor']
        }
      },
      {
        path: 'admin',
        name: 'testPage_admin',
        component: () => import('@/components/Test'),
        meta: {
          title: '权限-admin',
          roles: ['admin']
        }
      },
      {
        path: 'editor',
        name: 'testPage_editor',
        component: () => import('@/components/Test'),
        meta: {
          title: '权限-editor',
          roles: ['editor']
        }
      }
    ]
  },
  {
    path: '/iframe',
    name: 'iframe',
    component: Layout,
    meta: {
      title: 'IFRAME',
      icon: 'lock',
      roles: ['admin','editor']
    },
    children: [
      {
        path: 'qq',
        name: 'iframe_qq',
        component: () => import('@/views/iframe'),
        meta: {
          title: 'QQ',
          roles: ['admin','editor'],
          link: 'http://www.qq.com'
        }
      },
      {
        path: 'baidu',
        name: 'iframe_baidu',
        component: () => import('@/views/iframe'),
        meta: {
          title: '百度',
          roles: ['admin','editor'],
          link: 'https://www.baidu.com'
        }
      }
    ]
  }
];

// -----------------------------------------------------------------------------------------------

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () => import('@/components/lockscreen/lockingPage')
};

export const page403 = {
  path: '/403',
  name: 'error-403',
  meta: {
    title: '403-权限不足'
  },
  component: () => import('@/views/errorPage/403')
};

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/views/errorPage/404')
};

export const page500 = {
  path: '/500',
  name: 'error-500',
  meta: {
    title: '500-服务端错误'
  },
  component: () => import('@/views/errorPage/500')
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  locking,
  otherRouter,
  // ...appRouter,
  page403,
  // page404,
  page500
];
