const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  name: state => state.user.name,
  mobilePhone: state => state.user.mobilePhone,
  remarks: state => state.user.remarks,
  roles: state => state.user.roles,

  routers: state => state.app.routers,
  menus: state => state.app.menus,
  sidebarOpened: state => state.app.sidebarOpened,

  visitedViews: state => state.app.visitedViews,
  cachedViews: state => state.app.cachedViews
}

export default getters
