const state = {
  photo: [],
  remove: [],
  liList: ''
}

const mutations = {
  selectPhoto(state, photo) {
    state.photo = photo
  },
  selectRemove(state, photo) {
    state.remove = photo
  },
  selectLi(state, flag) {
    state.liList = flag
  },
  clear(state) {
    state.photo = [],
    state.liList = ''
  }
}

export default {
  state,
  mutations
}
