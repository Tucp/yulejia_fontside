const state = {
  localCity: '',
  selectCity: '',
  showX: true
}
const getters = {
  localCity: state => state.localCity,
  selectCity: state => state.selectCity
}
const mutations = {
  cityN (state,city) {
    state.localCity = city
  },
  cityS (state, data) {
    state.selectCity = data
  },
  changeShowX(state,flag) {
    state.showX = flag
  }
}

export default {
  state,
  mutations,
  getters
}
