<template lang="html">
  <div class="details">
    <div class="news">
      <div class="mask_div" v-show="mask" @click="hidden"></div>
      <header-item title="公告详情"></header-item>
      <img @click="star" :src="collected ? 'static/images/stared.png' : 'static/images/star.png' " class="star">
      <transition name="slide-bottom" v-if="share_show">
        <div class="share" v-show="share">
          <div class="weixin sshare" @click="shareFriend"><img src="static/images/weixin.png" alt="" class="weixin picc"><span>微信</span></div>
          <div class="firend sshare" @click="shareTimeline"><img src="static/images/friendzone.png" alt="" class="friend picc"><span>朋友圈</span></div>
        </div>
      </transition>
      <img src="static/images/share_2.png" alt="" class="find" @click="Share" v-if="share_show">
      <p class="title">
        {{news.title}}
      </p>
      <p class="time">
        {{news.create_time}}
      </p>
      <div class="content" v-html="news.content">
        {{news.content}}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      share_show: false,
      share: false,
      mask: false,
      isClicked: false,
      news: [],
      objid: null,
      cateid: null,
      collected: null,
      lists: '渔乐家' + window.location.href,
      url: global.url+'/'+window.location.hash,
    }
  },
  mounted () {
    if (window.settings) {
      // app内的分享按钮
      this.share_show = true
    }
    let weuserid = this.checkLogin(false)
    this.$http({
        method:'post',
        data:'id='+this.$route.params.id+'$weuserid='+weuserid,
        url:global.url+'/api/announce',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.news = res.data.data.detail
        this.objid = res.data.data.detail.id
        this.cateid = res.data.data.collect.id
        this.collected = res.data.data.collect.collect
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    star () {
      let weuserid = this.checkLogin(false)
      this.$http({
        method:'post',
        data:'objid='+this.objid+'&action=add&cate_id='+this.cateid+'&weuserid='+weuserid,
        url:global.url+'/api/focus',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"
        },  
      }).then(res=>{
        if (res.data.code == 0) {
            this.$router.push('/login')
          }
          if (res.data.code == 1) {
            this.collected = true
          }
          if (res.data.code == 2) {
            this.collected = false
          }
      })
      .catch(e => {
        console.log(e)
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
          window.settings.friendsSharetypeUrlToptitleDescript(1, 1, this.url, this.news.title, this.news.description)
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
          window.settings.friendsSharetypeUrlToptitleDescript(2, 1, this.url, this.news.title, this.news.description)
       
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
    }
  }
}
</script>

<style lang="css" scoped>
.content {
  margin: .15rem .4rem;
  word-wrap: break-word;
  font-size: 16px;
  color: #898989;
}

.time {
  margin: .4rem .4rem;
  color: #3e3a39;
}
.title {
  margin-top: 1.84074074rem;
  font-size: 18px;
  margin-left: .4rem;
  margin-right: .4rem;
  word-wrap: break-word;
  color: #3e3a39;
}
.find {
  position: fixed;
  right: .27rem;
  top: .46901rem;
  width: .5rem;
  height: .5rem;
  z-index: 10000;
}
.mask_div {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #808080;
  filter:alpha(Opacity=60);
  -moz-opacity:0.6;
  opacity: 0.6;
  overflow-y: hidden;
  z-index: 99;
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
  flex:2;
}
span {
  flex: 1;
  margin-top: .1rem;
  padding-left: .15rem;
  letter-spacing: .03rem;
}
.qq_right {
  padding-left: .25rem;
}
.slide-bottom-enter-active {
  transition: all .3s ease;
}
.slide-bottom-leave-active {
  transition: all .25s ease-out;
}
.slide-bottom-enter, .slide-bottom-leave-active {
  transform: translateY(-180px);
  opacity: 0;
}
.star {
  width: .6rem;
  height: .5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  top: .4rem;
  right: 1.4rem;
}
</style>
