export default {
  setUserInfo (state, user) {
    const userInfo = { ...user }
    state.userInfo = userInfo
  }
}
