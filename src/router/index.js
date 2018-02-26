import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store'

import Cookies from 'js-cookie';

import {routers, page404} from './router';

import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

Vue.use(Router);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

const router = new Router(RouterConfig);

export default router

NProgress.configure({ showSpinner: false });

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true;
  if (!permissionRoles) return true; // 没有配置权限默认有全部权限
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/authredirect'];

router.beforeEach((to, from, next) => {
  NProgress.start();

  if (Cookies.get('locking') === '1' && to.name !== 'locking') { // 判断当前是否是锁定状态
    next({
      replace: true,
      name: 'locking'
    });
  } else if (Cookies.get('locking') === '0' && to.name === 'locking') {
    next(false);
  } else if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetUserInfo').then(res => {
          const roles = res.data.roles;
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes([...store.getters.menus, page404]);// 只能最后注册404页面
            next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('Verification failed, please login again');
            next({ path: '/login' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/403', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login');
      NProgress.done()
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});
