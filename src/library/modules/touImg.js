const state = {
  avatar: ''
}

const mutations = {
  selectAvatar (state,img) {
    state.avatar = img
  }
}

export default {
  state,
  mutations
}
