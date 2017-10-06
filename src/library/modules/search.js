const state= {
  search: '',
  datas: [],
  top: [],
  url: ''
}
const getters = {
  search: state => state.search,
  datas: state => [...new Set(state.datas)],
  top: state => state.top,
  url: url => state.url
}
const mutations = {
  obtain (state, data) {
    state.search = data
  },
  add (state, data) {
    state.datas.push(data)
  },
  tabber (state, data) {
    let index = 0
    state.top = data[index].content
    setInterval(() => {
      // console.log(state.top);
      index++
      if (index > 1) {
        index = 0
      }
      state.top = data[index].content
      state.url = data[index].url
    },3000)
  }
}
export default {
  state,
  getters,
  mutations
}
