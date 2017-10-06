<template lang="html">
  <div class="aboutfishing swiper-slide allbg">
    <div class="addfishfield" @click="addyuediao" v-show="isShowAdd">
      <p>
        +
        <p class="text">发起约钓</p>
      </p>
    </div>
    <div class="nav">
      <router-link to="/main/aboutfishing/">
        <div class="nav-item newpublish">
          最新发布
        </div>
      </router-link>
      <router-link to="/aboutfishing/mypublish">
        <div class="nav-item mypublish">
          我发布的
        </div>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  mounted () {
    this.$store.commit('changeIndex', 1)
    // 设置参照物与比较物
    let p = 0,
        t = 0
    window.addEventListener('scroll', () => {
        // 默认相对滚动条顶部的偏移
        p = document.body.scrollTop
        // 上滚
        if (t <= p) {
            this.isShowAdd = false
        }
        // 下滚
        else {
            this.isShowAdd = true
        }

        setTimeout(() => {
            t = p
        }, 0)
    })
  },
  data() {
    return {
      isShowAdd: true
    }
  },
  created() {
    this.$store.dispatch('changeNavbarActive', 1)
  },
  methods: {
    addyuediao() {
    this.checkLogin()
    let that = this 
    this.checkPhone()
        .then(
            function(data){
                // 成功获取的回调
                if (!data) {
                  Toast({
                      message: '请先绑定手机',
                      position: 'middle',
                      duration: 2000
                    })
                    setTimeout(function () {
                      that.$router.push({
                        path: '/set/bind',
                      })
                    }, 2100)
                }else{
                  that.$store.commit('selectLi', '')
                  let weuserid = that.checkLogin(false)
                  that.$http({
                      method:'post',
                      data:'action=add&weuserid='+weuserid,
                      url:global.url+'/api/yuediao',
                      header: {  
                        "Content-Type": "application/x-www-form-urlencoded"  
                      },  
                    }).then(res=>{
                      if (res.data.code == '0') {
                          that.$router.push({
                            path: '/login',
                            query: { redirect: '/startFish' }
                          })
                        } else {
                          that.$router.push('/startFish')
                        }
                    })
                    .catch(e => {
                      console.log(e)
                    })
                }
            }, 
            function(reason, data){
                console.log('rejected');
                console.log(reason);
            }
        )

      
    }
  }
}
</script>

<style lang="css" scoped>
.aboutfishing .nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  margin-top: 2.46296296rem;
  border-top: .277777778rem solid #f0f0f0;
  padding: .462962963rem 2.22222222rem .22222222rem 2.22222222rem;
}

.aboutfishing .nav-item {
  float: left;
  display: inline-block;
  border: 1px solid #FCAC0C;
  padding: .2rem .6rem;
  /*border-radius: 2px;*/
  color: #252525;
}

.aboutfishing .newpublish {
  border-top-left-radius: 3px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 3px;
}

.aboutfishing .mypublish {
  border-top-left-radius: 0;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 0;
}

.router-link-exact-active .nav-item {
  background-color: #FCAC0C;
  color: #fff;
}

.addfishfield {
  width: 1.7rem;
  height: 1.7rem;
  position: fixed;
  z-index: 999;
  right: .5rem;
  bottom: 2rem;
  color: #fff;
  background-color: #FCAC0C;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 15px 5px #fdc961;
  box-shadow: 0 0 15px 5px #fdc961;
  overflow: hidden;
}

.addfishfield>p {
  font-size: 25px;
  text-align: left;
  height: .8rem;
  text-align: center;
  overflow: hidden;
}

.addfishfield .text {
  font-size: 12px;
  text-align: center;
}
</style>
