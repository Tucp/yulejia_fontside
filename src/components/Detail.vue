<template lang="html">
  <div class="detail header-item">
    <div class="mask_div" v-show="mask" @click="hidden" @touchmove.prevent></div>
    <header-item title="钓场详情" path="/fish"></header-item>
    <transition name="slide-bottom">
        <div class="share" v-show="share">
          <div class="weixin sshare" @click="shareFriend"><img src="static/images/weixin.png" alt="" class="weixin picc"><span>微信</span></div>
          <div class="firend sshare" @click="shareTimeline"><img src="static/images/friendzone.png" alt="" class="friend picc"><span>朋友圈</span></div>
        </div>
    </transition>
    <img src="static/images/share.png" class="find" @click="Share"  v-if="share_show">
    <div class="banner1">
      <mt-swipe :auto="8000" :speed="1000">
        <mt-swipe-item v-for="item in detail.photo" :key="item.id" class="opo">
          <img v-lazy="item" class="opo">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="fishname">
      <span class="names">{{detail.title}}</span>
             <button @click.prevent.stop="clickButton(detail.id,$event)" :class="{active: !detail.focus }">
          {{detail.focus ? '已关注' : '+ 关注'}}  </button>
    </div>
    <div class="mask"></div>
    <div class="position_msg">
      <div class="city" @click.prevent.stop='goMap(detail.title, detail.address, detail.latitude, detail.longitude)'>
        <img src="static/images/city.png" class="posi">
        <span class="msg">{{detail.address}}</span>
        <div class="spread"></div>
      </div>
      <div class="city" @click="callphone">
        <img src="static/images/tel.png" class="posi">
        <span class="msg">{{detail.tel}}</span>
        <div class="spread"></div>
      </div>
    </div>
    <div class="mask"></div>
    <div class="container">
      <div class="detail_header">
        <div class="group">
          <router-link :to="{name: 'brief', params: { id: objid }}">
            <div>
              钓场简介
            </div>
          </router-link>
        </div>
        </router-link>
        <div class="group" v-for="item in commentType" :key="item.id">
          <router-link :to="{name: 'showComment', params: {objid: objid, cateid: item.id}}">
            <div class="button">
              {{item.name}}
            </div>
          </router-link>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      share_show: false,
      detail: {},
      tel: '',
      share: false,
      show: false,
      mask: false,
      isClicked: false,
      commentType: [],
      comments: [],
      objid: this.$route.params.id,
      cateid: null,
      focusCateid: null,
      lists: '渔乐家' + window.location.href,
      url: global.url+'/'+window.location.hash
    }
  },
  methods: {
    goMap(name, addr, lat, lng) {
      this.$router.push({
        name: 'navMap', params: { name: name, addr: addr, lat: lat, lng: lng }
      })
    },
    shareFriend(){
      try{
          /*Sharefriend   枚举 1 为好友  2为朋友圈
            type：        枚举  1 为普通分享 

            webpageUrl:   分享跳转链接 
            title:        分享标题 
            description： 分享描述
          */
          window.settings.friendsSharetypeUrlToptitleDescript(1, 1, this.url, this.detail.title, this.detail.description)
       }catch(e){
               
      }
    },
    shareTimeline(){
      try{
          /*Sharefriend   枚举 1 为好友  2为朋友圈
            type：        枚举  1 为普通分享 

            webpageUrl:   分享跳转链接 
            title:        分享标题 
            description： 分享描述
          */
          window.settings.friendsSharetypeUrlToptitleDescript(2, 1, this.url, this.detail.title, this.detail.description)
       
       }catch(e){
               
      }
    },
    Share () {
      this.share = !this.share
      this.mask = !this.mask
    },
    hidden () {
      this.mask = false
      this.share = false
    },
    goUrl(url) {
      window.location.href = url
    },
    changeTab(type) {
      this.Tab = type
    },
    back() {
      if (this.show) {
        this.show = false
        this.mask = false
      } else {
        this.show = true
        this.mask = true
        document.querySelector('.detail')
        document.querySelector('.detail').addEventListener("touchmove", function (event) {
          event.preventDefault;
        }, false)
      }
    },
    cencel() {
      this.show = false
      this.mask = false
    },
    sure() {
      this.show = false
      this.mask = false
    },
    clickButton(target_id, e) {
      let that = this
      let id = target_id;
      let weuserid = this.checkLogin()
      this.$http({
        method:'post',
        data:'action=add&objid='+id+'&cate_id='+this.focusCateid+'&weuserid='+weuserid,
        url:global.url+'/api/focus',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          if (res.data.code == 0) {
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 1200
            });
          }else{
            let btn = e.currentTarget
            if (that.detail.focus == true) {
              that.detail.focus = !that.detail.focus
            } else if (that.detail.focus == false) {
              that.detail.focus = !that.detail.focus
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
      
    },
    callphone() {
      window.location.href = 'tel:' + this.tel
    }
  },
  mounted() {
    if (window.settings) {
      // app内的分享按钮
      this.share_show = true
    }
    
    let id = this.$route.params.id
    let weuserid = this.checkLogin(false)
    this.$http({
        method:'post',
        data:'id='+id+'&weuserid='+weuserid,
        url:global.url+'/api/getfishing',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        let photos = res.data.data.detail.photo
        if (res.data.code === 1) {
          let head = global.url+'/uploads/images/'
          for (let i = 0; i < photos.length; i++) {
            photos[i] = head + photos[i]
          }
          this.detail = res.data.data.detail
          this.commentType = res.data.data.comments
          this.tel = res.data.data.detail.tel
          this.focusCateid = res.data.data.focus.id
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>
<style lang="css" scoped>
.router-link-exact-active div {
  border-bottom: 2px solid #119DF8;
  font-size: 14px;
  color: #119DF8;
}
.opo {
  overflow: hidden;
}

.group {
  line-height: 1.2rem;
  flex: 1;
  text-align: center;
  line-height: 1.2rem;
  font-size: 14px;
  font-weight: 500;
}
.banner1 {
  width: 100%;
  height: 6.2rem;
}

.banner1 img {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
}

.find {
  position: fixed;
  right: .27rem;
  top: .501rem;
  width: .5rem;
  height: .5rem;
  z-index: 10000;
}

.fishname {
  width: 100%;
  height: 1.4rem;
  /*background-color: green;*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mask {
  width: 100%;
  height: .3rem;
  background-color: #F0F0F0;
}

.city {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #F0F0F0;
  height: 1.4rem;
  display: flex;
  align-items: center;
}

.position_msg {
  width: 100%;
}
.spread {
  position: absolute;
  right: .5rem;
  top: .6rem;
  display: inline-block;
  width: .35rem;
  height: .35rem;
  border-left: 1px solid #9B9B9C;
  border-top: 1px solid #9B9B9C;
  transform: rotate(135deg);
}

.names {
  font-size: 16px;
  padding-left: .33rem;
}

button {
  display: block;
  margin-right: .4rem;
  width: 2rem;
  height: 1rem;
  background-color: #ffffff;
  border: 1px solid #898989;
  color: #898989;
}

.fishname button.active {
  border: 1px solid #252525;
  color: #FCAC0D;
  background-color: #252525;
}

.posi {
  width: .85rem;
  height: .5rem;
  padding-left: .33rem;
}

.msg {
  font-size: 14px;
  padding-left: .1rem;
}

.detail_header {
  width: 100%;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
  height: 8rem;
  padding-top: .5rem;
}

.share {
  padding-left: .2rem;
  padding-right: .2rem;
  padding-top: 1.55185185rem;
  padding-bottom: .2rem;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}

.sshare {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.picc {
  width: 1.2rem;
  height: 1.2rem;
  flex: 2;
}

span {
  padding-left: .15rem;
  letter-spacing: .03rem;
}

.qq_right {
  padding-left: .25rem;
}

.show {
  position: fixed;
  width: 8rem;
  top: 8.5rem;
  left: 1rem;
  border-radius: 10px;
  background-color: white;
  z-index: 100;
}

.mask_div {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #808080;
  filter: alpha(Opacity=60);
  -moz-opacity: 0.6;
  opacity: 0.6;
  overflow-y: hidden;
  z-index: 99;
}

.sure {
  width: 100%;
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid #F0F0F0;
  font-weight: 300;
}

.option {
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.a,
.b {
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 300;
}

.b {
  color: #47ABF9;
  border-left: 1px solid #F0F0F0;
}

.slide-bottom-enter-active {
  transition: all .3s ease;
}

.slide-bottom-leave-active {
  transition: all .25s ease-out;
}

.slide-bottom-enter,
.slide-bottom-leave-active {
  transform: translateY(-180px);
  opacity: 0;
}
</style>
