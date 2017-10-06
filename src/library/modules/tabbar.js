import * as types from '../mutations_types'

const state = {
  tabbars: [
    {
      id: 0,
      path: '/main',
      isActive: true,
      src: './static/images/new_home.png',
      src_active: './static/images/new-home-active.png',
      name: '首页'
    },
    {
      id: 1,
      path: '/store',
      isActive: false,
      src: './static/images/new-dayubang.png',
      src_active: './static/images/new-dayubang-active.png',
      name: '大鱼榜'
    },
    {
      id: 2,
      path: '/fish',
      isActive: false,
      src: './static/images/new-fish.png',
      src_active: './static/images/new-fish-active.png',
      name: '钓场'
    },
    {
      id: 3,
      path: '/my',
      isActive: false,
      src: './static/images/new-my.png',
      src_active: './static/images/new-my-active.png',
      name: '我的'
    }
  ]
}

const getters = {
  tabbars: state => state.tabbars
}

const actions = {
  changeTabbarActive ({ commit }, id) {
    commit(types.CHANGE_TABBAR_ACTIVE, id)
  }
}

const mutations = {
  [types.CHANGE_TABBAR_ACTIVE] (state, id) {
    state.tabbars.forEach(tabbar => {
      tabbar.isActive = false
    })
    state.tabbars[id].isActive = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}