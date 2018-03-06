import {routers, otherRouter, appRouter} from '@/router/router';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param appRouterMap
 * @param roles
 */
function filterAppRouter(appRouterMap, roles) {
  const accessedRouters = appRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAppRouter(route.children, roles)
      }
      return true
    }
    return false
  });
  return accessedRouters
}

const app = {
  state: {
    routers: routers,
    menus: [],

    sidebarOpened: true,

    visitedViews: [],
    cachedViews: [],

    logs: []
  },

  mutations: {
    SET_ROUTERS: (state, accessedRouters) => {
      state.routers = routers.concat(accessedRouters)
    },
    SET_MENUS: (state, accessedRouters) => {
      state.menus = accessedRouters
    },

    TOGGLE_SIDEBAR: state => {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 新打开标签页
    /*ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },*/
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.fullPath)) return
      state.visitedViews.push({
        name: view.name,
        path: view.fullPath,
        title: view.meta.title || 'no-name'
      })
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    // 关闭当前的标签页
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [index, item] of state.visitedViews.entries()) {
        if (item.path === view.path) {
          state.visitedViews.splice(index, 1)
          break
        }
      }
      for (const [index, item] of state.cachedViews.entries()) {
        if (item === view.name) {
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    // 关闭其他的标签页
    DEL_OTHERS_VIEWS: (state, view) => {
      let viewIndex = -1
      for (const [index, item] of state.visitedViews.entries()) {
        if (item.path === view.fullPath) {
          viewIndex = index
          break
        }
      }
      if (viewIndex === 0) {
        state.visitedViews.splice(1); // 首页标签
      } else {
        state.visitedViews.splice(viewIndex + 1); // 当前标签的后标签
        state.visitedViews.splice(1, viewIndex - 1);// 当前标签的前标签
      }


      let cachedViewNameIndex = -1
      for (const [index, item] of state.cachedViews.entries()) {
        if (item === view.name) {
          cachedViewNameIndex = index
          break
        }
      }

      if (cachedViewNameIndex !== -1) {
        let firstCachedView = state.cachedViews[0];
        if (firstCachedView) {
          if (firstCachedView === 'dashboard_home') {
            if (cachedViewNameIndex === 0) {
              state.cachedViews.splice(1)
            } else {
              state.cachedViews.splice(cachedViewNameIndex + 1)
              state.cachedViews.splice(1, cachedViewNameIndex -1)
            }
          } else {
            state.cachedViews.splice(cachedViewNameIndex + 1)
            state.cachedViews.splice(0, cachedViewNameIndex)
          }
        }
      } else {
        state.cachedViews = []
      }
    },
    // 关闭所有的标签页
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = state.visitedViews.slice(0, 1)
      let firstCachedView = state.cachedViews[0]
      if (firstCachedView) {
        if (firstCachedView === 'dashboard_home') {
          state.cachedViews = state.cachedViews.slice(0, 1)
        } else {
          state.cachedViews = []
        }
      }
    },

    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    }
  },

  actions: {

    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters;
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = appRouter;
        } else {
          accessedRouters = filterAppRouter(appRouter, roles);
        }
        commit('SET_ROUTERS', accessedRouters);
        commit('SET_MENUS', accessedRouters);
        resolve();
      })
    },

    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },

    // ----------------------浏览栏-------------------------
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    },

    addErrorLog({ commit }, log) {
      commit('ADD_ERROR_LOG', log)
    }
  }
}

export default app
