const blank = {
  meta: {
    code: 200,
    msg: 'ok blank'
  },
  data: {}
};

export default {
  user: config => {
    const user = JSON.parse(config.body)
    console.log(user);
    return blank
  },
  modifyPasswd: config => {
    const passwd = JSON.parse(config.body)
    console.log(passwd);
    return blank
  }
}
