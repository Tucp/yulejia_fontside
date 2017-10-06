<template lang="html">
  <div class="racedetail header-item">
    <div class="mask_div" v-show="mask" @click="hidden" @touchmove.prevent></div>
    <header-item title="赛事详情"></header-item>
    <transition name="slide-bottom">
        <div class="share" v-show="share">
          <div class="weixin sshare" @click="shareFriend"><img src="static/images/weixin.png" alt="" class="weixin picc"><span>微信</span></div>
          <div class="firend sshare" @click="shareTimeline"><img src="static/images/friendzone.png" alt="" class="friend picc"><span>朋友圈</span></div>
        </div>
    </transition>
    <img src="static/images/share.png" @click="Share" v-if="share_show">
    <img @click="star" :src="collected ? 'static/images/stared.png' : 'static/images/star.png' " class="star">
    <div class="banner1">
      <mt-swipe :auto="8000" :speed="1000">
        <mt-swipe-item  v-for="item in race.photo" :key="item">
          <img v-lazy="imgSrc + item">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="information">
      <div class="title" v-html="race.title">
      </div>
      <div class="content">
        <div class="race">
          <div class="time">
            <p><span>比赛时间：</span>{{race.race_begin}} - {{race.race_end}}</p>
          </div>
          <div class="grade">
            <p><span>赛级：</span>{{race.type}}</p>
          </div>
        </div>
        <div class="apply">
          <div class="time">
            <p><span>报名时间：</span>{{race.sign_begin}} - {{race.sign_end}}</p>
          </div>
          <button class="tip" v-if="!is_delay">
           {{race.expired}}截止报名
          </button>
        </div>
      </div>
    </div>
    <div class="contact bb">
      <!-- <a :href="race.url" @click.stop> -->
        <div class="location flex-item bb-item" @click.prevent.stop='goMap(race.title, race.address, race.latitude, race.longitude)'>
          <img src="static/images/ylocal.jpg">
          <p>{{race.address}}</p>
          <i class="right"></i>
        </div>
      <!-- </a> -->
      <div class="tel flex-item" @click="callphone(race.tel)">
        <img src="static/images/ytel.png">
        <p>{{race.tel}}</p>
        <i class="right"></i>
      </div>
    </div>
    <div class="bb">
      <div class="bb-item">
        <!-- <router-link to="/description"> -->
          <div class="desc flex-item" @click="toggleDesc">
            <p>比赛说明</p>
            <i class="right" :class="{active: isDescription}"></i>
          </div>
          <description v-show="isDescription" v-html="race.content"></description>
        <!-- </router-link> -->
      </div>
      <div class="bb-item" @click="toggleAward">
        <div class="reward flex-item">
          <p>比赛奖励</p>
          <i class="right"></i>
        </div>
        <p v-show="isAward" style="padding:.5rem;" v-html="race.award"></p>
      </div>      
    </div>
    <mu-list>
      <comment-item :comments="comments" :cateid="cateid" :objid="objid"></comment-item>
    </mu-list>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    <div class="footer">
      <!-- <router-link to="/comment"> -->
        <div v-if="show" class="sendcomment" @click="goComment(objid, cateid)" style="width:50%">
          发表评论
        </div>
        <div v-if="!show" class="sendcomment" @click="goComment(objid, cateid)" style="width:100%">
          发表评论
        </div>
      <!-- </router-link> -->
      <!-- <router-link to="/personapply"> -->
        <div v-if="show" class="applyrace"  @click="flag && reply(race.id)" v-bind:style="styleObject">
          {{text}}
        </div>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import Description from './Description'
export default {
  components: {
    'description': Description
  },
  data() {
    return {
      share_show: false,
      styleObject:{
        background: 'red',
        width: '50%'
      },
      isClicked: false,
      race: {},
      comments: [],
      share: false,
      mask: false,
      isDescription: false,
      isAward: false,
      cateid: null,
      objid: null,
      collected: null,
      collectCateid: null,
      scroller: null,
      loading: false,
      page: 1,
      pagesize: 10,
      list: '渔乐家',
      lists: '渔乐家' + window.location.href,
      url: global.url+'/'+window.location.hash,
      text: '报名比赛',
      is_pay: '-1',
      flag: 1,
      show: 1,
      imgSrc: global.imgSrc,
      is_delay: 0,
      bgcolor: ''
    }
  },
  methods: {
    goMap(name, addr, lat, lng) {
      this.$router.push({
        name: 'navMap', params: { name: name, addr: addr, lat: lat, lng: lng }
      })
    },
    reply (id) {
      this.checkLogin()
      let that = this
      this.checkPhone()
        .then(
            function(data){
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
                    return false
                }else{
                  switch (that.is_pay){
                      case -1:
                        that.$router.push({
                          name: 'login'
                        })
                        break;

                      case 0:
                        that.$router.push({
                          name: 'personapply', params: { id: id}
                        })
                        break;

                      default:
                        that.$router.push({
                          name: 'personapply', params: { id: id}
                        })
                        break;
                    }
                }
            }, 
            function(reason, data){
                console.log('rejected');
                console.log(reason);
            }
        )
      
    },
    shareFriend(){
      try{
          /*Sharefriend   枚举 1 为好友  2为朋友圈
            type：        枚举  1 为普通分享 

            webpageUrl:   分享跳转链接 
            title:        分享标题 
            description： 分享描述
          */
          window.settings.friendsSharetypeUrlToptitleDescript(1, 1, this.url, this.race.title, this.race.description)
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
          window.settings.friendsSharetypeUrlToptitleDescript(2, 1, this.url, this.race.title, this.race.description)
       
       }catch(e){
               
      }
    },
    loadMore () {
      const totalNum = this.comments.count
      const pageNum = Math.floor(totalNum / this.pagesize) + 1
      if (this.page < pageNum) {
        this.loading = true
        setTimeout(() => {
          this.page++

          this.$http({
            method:'post',
            data:'objid='+this.objid+'&cate_id='+this.cateid+'&page='+this.page+'&pagesize='+this.pagesize,
            url:global.url+'/api/comments',
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          }).then(res=>{
            if (res.data.code === 1) {
              res.data.data.data.forEach(data => {
                this.comments.data.push(data)
              })
            }
          })
          .catch(e => {
            console.log(e)
          })

          this.loading = false
        }, 2000)
      }
    },
    star () {
      let weuserid = this.checkLogin()
      this.$http({
            method:'post',
            data:'objid='+this.objid+'&cate_id='+this.collectCateid+'&action=add&weuserid='+weuserid,
            url:global.url+'/api/focus',
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          }).then(res=>{
            if (res.data.code === 0) {
              this.$router.push('/login')
            }
            if (res.data.code === 1) {
              this.collected = true
            }
            if (res.data.code === 2) {
              this.collected = false
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    goComment(objid, cateid) {
      this.$router.push({
        name: 'comment', params: { objid: objid, cateid: cateid }
      })
    },
    callphone(tel) {
      window.location.href = "tel:" + tel
    },
    toggleShow (item) {
      item = !item
    },
    toggleDesc() {
      this.isDescription = !this.isDescription
    },
    toggleAward() {
      this.isAward = !this.isAward
    },
    Share() {
      this.share = !this.share
      this.mask = !this.mask
      document.removeEventListener("touchmove", function (e) {
        e.preventDefault()
      }, false)
    },
    hidden() {
      this.share = false
      this.mask = false
    }
  },
  mounted() {
    if (window.settings) {
      // app内的分享按钮
      this.share_show = true
    }
    let weuserid = this.checkLogin(false)
    this.scroller = this.$el
    let id = this.$route.params.id
    this.$http({
        method:'post',
        data:'id='+id+'&weuserid='+weuserid,
        url:global.url+'/api/race',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {
          this.race = res.data.data.data
          this.is_delay= res.data.data.data.is_delay
          this.signup = res.data.data.signup
          this.collected = res.data.data.data.collect.collect
          this.collectCateid = res.data.data.data.collect.id
          this.objid = res.data.data.data.id
          this.cateid = res.data.data.data.comments[0].id
          this.is_pay = res.data.data.signup.is_pay
          if (this.race.only_show == 1) {
            this.show = 0
          }
          if (this.race.is_delay == 1) {
            this.text = '赛事延迟'
            this.flag = 0
            this.styleObject.background = '#858585'
          }else{
            switch(res.data.data.signup.is_pay){
            case 1:
              this.text = '您已报名'
              break;
            case -1:
              this.text = '登录报名'
              break;
            case 0:
              this.text = '继续支付'
              break;
            default:
              this.text = '报名比赛'
              break;
            }
          }
          
        }
      })
      .then(res => {
        this.$http({
            method:'post',
            data:'objid='+this.objid+'&cate_id='+this.cateid+'&weuserid='+weuserid,
            url:global.url+'/api/comments',
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          }).then(res=>{
            if (res.data.code === 1) {
              this.comments = res.data.data
            }
          })
          .catch(e => {
            console.log(e)
          })
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
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
  flex: 1;
  margin-top: .1rem;
  padding-left: .15rem;
  letter-spacing: .03rem;
}

.qq_right {
  padding-left: .25rem;
}

.racedetail {
  margin-bottom: 1.5rem;
}

.banner1 {
  width: 100%;
  height: 6.01851852rem;
}

.banner1 img {
  width: 100%;
  height: 100%;
  float: left;
}

.racedetail>img {
  width: .5rem;
  height: .5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  top: .4rem;
  right: .4rem;
}

.racedetail .star {
  width: .6rem;
  height: .5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  top: .4rem;
  right: 1.4rem;
}

.racedetail .information {
  padding: .462962963rem .4166666667rem;
  border-bottom: .277777778rem solid #f0f0f0;
}

.racedetail .information .title {
  font-size: 16px;
  line-height: 30px;
  margin-bottom: .925925926rem;
}


/*.racedetail .information .content {
  font-size: 14px;
}*/

.racedetail .information span {
  color: #898989;
}

.racedetail .race {
  margin-bottom: .44444444rem;
}

.racedetail .time {
  float: left;
}

.racedetail .grade {
  float: right;
}

.racedetail .tip {
  float: right;
  padding: .1rem .240740741rem;
  background-color: #fff;
  border: 1px solid rgb(246, 70, 72);
  border-radius: 3px;
  font-size: 12px;
  color: rgb(246, 70, 72);
}

.racedetail .flex-item {
  padding: 0 .4166666667rem;
  height: 1.277777778rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  /*border-bottom: 1px solid #f0f0f0;*/
}

.racedetail .bb-item {
  border-bottom: 1px solid #f0f0f0;
}

.racedetail .flex-item img {
  height: .37037037rem;
  width: .37037037rem;
  margin-right: .277777778rem;
}

.racedetail .flex-item p {
  white-space: nowrap;
  flex: 1;
  font-size: 14px;
}

.racedetail .right {
  border-top: .0462962963rem solid #9b9b9c;
  border-right: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(45deg);
  /*margin-right: .3977777778rem;*/
}

.racedetail .bb {
  border-bottom: .277777778rem solid #f0f0f0;
}

.racedetail .footer {
  height: 1.33333333rem;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  color: #fff;
}

.racedetail .footer div {
  float: left;
/*  width: 50%;*/
  text-align: center;
  line-height: 1.33333333rem;
  font-size: 14px;
  color: #fff;
}

.racedetail .footer div.sendcomment {
  background-color: rgb(243, 152, 0);
}

.racedetail .footer div.applyrace {
  background-color: rgb(246, 70, 72);
}
</style>
