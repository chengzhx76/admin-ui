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

    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },

    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },

    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },

    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = [];
      state.cachedViews = [];
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
