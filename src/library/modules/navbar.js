import * as types from '../mutations_types'

const state = {
  navbars: [
    { id: 0, path: '/main/', isActive: true, name: '推荐' },
    { id: 1, path: '/main/aboutfishing', isActive: false, name: '约钓' },
    { id: 2, path: '/main/video', isActive: false, name: '视频' }
  ]
}

const getters = {
  navbars: state => state.navbars
}

const actions = {
  changeNavbarActive ({ commit }, id) {
    commit(types.CHANGE_NAVBAR_ACTIVE, id)
  }
}

const mutations = {
  [types.CHANGE_NAVBAR_ACTIVE] (state, id) {
    state.navbars.forEach(navbar => {
      navbar.isActive = false
    })
    state.navbars[id].isActive = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
