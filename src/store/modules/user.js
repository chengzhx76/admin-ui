import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { updateUser, modifyPasswd } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    username: '',
    name: '',
    token: getToken(),
    avatar: '',
    mobilePhone: '',
    remarks: '',
    roles: []
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_MOBILE_PHONE: (state, mobilePhone) => {
      state.mobilePhone = mobilePhone
    },
    SET_REMARKS: (state, remarks) => {
      state.remarks = remarks
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({commit}, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_USERNAME', data.username)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_MOBILE_PHONE', data.mobilePhone)
          commit('SET_REMARKS', data.remarks)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 更新当前用户信息
    UpdateUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        updateUser(user.name, user.mobilePhone, user.remarks).then(response => {
          commit('SET_NAME', user.name)
          commit('SET_MOBILE_PHONE', user.mobilePhone)
          commit('SET_REMARKS', user.remarks)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 更新当前用户密码
    UpdatePasswd({ commit }, password) {
      return new Promise((resolve, reject) => {
        modifyPasswd(password).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
