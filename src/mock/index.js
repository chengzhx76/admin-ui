import Mock from 'mockjs'
import loginAPI from './login'
import userAPI from './user'

// 登录相关
Mock.mock(/\/login\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 用户相关
Mock.mock(/\/user\/user/, 'post', userAPI.user)
Mock.mock(/\/user\/modifyPasswd/, 'post', userAPI.modifyPasswd)

export default Mock
