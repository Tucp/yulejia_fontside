const state= {
  sign: ''
}
const getters = {
  sign: state => state.sign
}
const mutations = {
  sign (state, data) {
    state.sign = data
    console.log(state.sign);
  }
}
export default {
  state,
  getters,
  mutations
}
