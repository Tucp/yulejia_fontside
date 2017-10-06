const state = {
  showChose: false,
  province: '',
  city: '',
  district: '',
  ydCity: '',
  ydDistrict: '',
  photo: 'http://img3.imgtn.bdimg.com/it/u=3439657231,4061920227&fm=214&gp=0.jpg,'
}

const mutations = {
  showChose (state,flag) {
    state.showChose = flag
  },
  chooseAddress(state,flag) {
  	state.province = flag.province
  	state.city = flag.city
  	state.district = flag.district
  },
  ydAddres(state,flag) {
    state.ydCity = flag.city
    state.ydDistrict = flag.district
  },
  choosePhoto(state,flag) {
    state.photo = flag
  }
}

export default {
  state,
  mutations
}