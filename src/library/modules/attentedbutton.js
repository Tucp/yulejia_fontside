import * as types from '../mutations_types'
const state = {
  buttonState: { innerText1: '+关注', innerText2: '已关注', isActive: true }
}

const getters = {
  buttonState: state => state.buttonState
}

const mutations = {
  [types.CHANGE_ATTENTED_BUTTON_ACTIVE] (state) {
    state.buttonState.isActive = !state.buttonState.isActive
  }
}

const actions = {
  changeAttentedButtonActive ({ commit }) {
    commit(types.CHANGE_ATTENTED_BUTTON_ACTIVE)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
