const state = {
    yTime: '',
    cityName:'',
    longitude:'',
    latitude:'',
    tel: '',
    content: '',
    index: 0
}

const mutations = {
  getCityInfo (state,city) {
    state.cityName = city.name
    state.longitude = city.lon
    state.latitude = city.lat
  },
  changeTime(state,flag) {
    state.yTime = flag
  },
  changeIndex(state,flag) {
    state.index = flag
  },
  changeTel(state,flag) {
    state.tel = flag
  },
  changeContent(state,flag) {
    state.content = flag
  }
}

export default {
  state,
  mutations
}
