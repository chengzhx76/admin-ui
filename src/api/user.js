import request from '@/utils/request'

export function updateUser(name, mobilePhone, remarks) {
  const data = {
    name,
    mobilePhone,
    remarks
  }
  return request({
    url: '/user/user',
    method: 'post',
    data
  })
}

export function modifyPasswd(passwd) {
  const data = {
    passwd
  }
  return request({
    url: '/user/modifyPasswd',
    method: 'post',
    data
  })
}


