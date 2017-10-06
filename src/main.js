// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/library/vuex'
import mint from '@/library/mint'
import muse from '@/library/muse'
import axios from '@/library/axios'
import com from '@/library/component'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
var VueTouch = require('vue-touch')
Vue.use(VueTouch, { name: 'v-touch' })
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})

// 定义全局资源路径
// 1.api路径
global.url = 'http://ylj.tscce.cn'
// 2.图片路径
global.imgSrc = 'http://ylj.tscce.cn/uploads/images/'
// 3.图片上传接口
global.imgUpload = 'http://ylj.tscce.cn/admin/upload/weui_upload.html'

// localStorage.getItem('weuserid')
// 登录验证封装
Vue.prototype.checkLogin = function (jump = true) {
  let weuserid = 155
  if (weuserid != 'undefined' && weuserid != null) {
    return weuserid
  } else {
    if (jump == true) {
      this.$router.push({
        path: '/login'
      })
    }else{
      return false
    }
  }
}

// 验证手机号是否绑定
Vue.prototype.checkPhone = function () {
      let weuserid = 155
      let that = this
      var data = new Promise(
        function(resolve, reject){
          that.$http({
                method:'post',
                data:'type=get_info&weuserid='+weuserid,
                url:global.url+'/api/user',
                header: {  
                  "Content-Type": "application/x-www-form-urlencoded"  
                },  
              }).then(res=>{
                if (res.data.code) {
                  if (res.data.data.data.mobile) {
                    var data = res.data.data.data.mobile
                  }else{
                    var data = false
                  }
                }else{
                  var data = false
                }

                resolve(data);
              })
              .catch(e => {
                console.log(e)
            })
          }
        )
      return data
    }

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mint,
  store,
  axios,
  com,
  template: '<App/>',
  components: { App }
})
