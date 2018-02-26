import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: '',
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken()
  }
  return config
}, error => {
  console.log(error);
  Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const meta = response.data.meta;
    if (meta.code !== 200) {
      Message({
        message: meta.msg,
        type: 'error',
        duration: 5 * 1000
      });
      return Promise.reject('error');
    } else {
      return response.data;
    }

  },
  error => {
    console.log('err' + error)
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
