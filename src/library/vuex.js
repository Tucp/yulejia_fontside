import Vue from 'vue'
import Vuex from 'vuex'
import navbar from './modules/navbar'
import tabbar from './modules/tabbar'
import banner from './modules/banner'
import wait from './modules/wait'
import cell from './modules/cell'
import attention from './modules/attention'
import fans from './modules/fans'
import attentedbutton from './modules/attentedbutton'
import search from './modules/search'
import selectCity from './modules/selectCity'
import selector from './modules/selector'
import apply from './modules/apply'
import membership from './modules/membership'
import sign from './modules/sign'
import fish from './modules/fish.js'
import photo from './modules/photo.js'
import touImg from './modules/touImg.js'
import reply from './modules/reply.js'
// 将Vuex 注入Vue,所有的组件都可以
// this.$store 找到vuex Store
Vue.use(Vuex)
// 返回唯一的一个Store实例 状态仓库
const store = new Vuex.Store({
  modules: {
    navbar,
    tabbar,
    banner,
    wait,
    cell,
    attention,
    fans,
    attentedbutton,
    search,
    selectCity,
    selector,
    apply,
    membership,
    sign,
    fish,
    photo,
    touImg,
    reply
  }
})
export default store
