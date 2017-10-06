<template lang="html">
  <div class="scorereport header-item">
    <div class="mask_div" v-show="mask" @click="hiddenShare" @touchmove.prevent></div>
    <header-item title="成绩报道"></header-item>
    <transition name="slide-bottom">
      <div class="share" v-show="share">
        <div class="weixin sshare"><img src="static/images/weixin.png" class="weixin picc"><span>微信</span></div>
        <div class="firend sshare"><img src="static/images/friendzone.png" class="friend picc"><span>朋友圈</span></div>
        <!-- <div class="weibo sshare"><img src="static/images/weibo.png" class="weibo picc"><span>微博</span></div>
        <div class="qq sshare"><img src="static/images/qq.png" class="qq picc"><span class="qq_right">QQ</span></div>
        <div class="qqzone sshare"><img src="static/images/qqzone.png" class="qqz picc"><span class="zone">QQ空间</span></div> -->
      </div>
    </transition>
    <img src="static/images/share.png" @click="Share">
    <img @click="star" :src="collected ? 'static/images/stared.png' : 'static/images/star.png' " class="star">
    <div class="banner1">
      <mt-swipe :auto="8000" :speed="1000">
        <mt-swipe-item v-for="item in data.photo" :key="item">
          <img v-lazy="imgSrc+item">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="information">
      <div class="title">
        {{data.title}}
      </div>
      <div class="content">
        <div class="race">
          <div class="time">
            <p><span>比赛时间：</span>{{data.race_begin}} - {{data.race_end}}</p>
          </div>
          <div class="grade">
            <p><span>赛级：</span>{{data.type}}</p>
          </div>
        </div>
        <div class="apply">
          <div class="time">
            <p><span>报名时间：</span>{{data.sign_begin}} - {{data.sign_end}}</p>
          </div>
          <!-- <button class="tip">
            11天后截止报名
          </button> -->
        </div>
      </div>
    </div>
    <div class="contact bb">
      <div class="location flex-item" @click.prevent.stop='goMap(data.title, data.address, data.latitude, data.longitude)'>
        <img src="static/images/ylocal.jpg">
        <p>{{data.address}}</p>
        <i class="right"></i>
      </div>
      <div class="tel flex-item" @click="callphone(data.tel)">
        <img src="static/images/ytel.png">
        <p>{{data.tel}}</p>
        <i class="right"></i>
      </div>
    </div>
    <div class="seescore" v-if="records !== null">
      <div class="nav">
        <div class="nav-item day" @click="day">
          <span :class="{active: isDay}">第一天</span>
          <i :class="{active: isDay}"></i>
        </div>
        <div class="nav-item field" @click="field">
          <span :class="{active: isField}">第一场</span>
          <i :class="{active: isField}"></i>
        </div>
      </div>
      <div class="scoredetail" v-html="content">

      </div>
    </div>
    <transition name="fade" v-if="records !== null">
      <div class="select" @touchmove.prevent v-show="isShowDay" @click="hidden">
        <div class="select-item" v-for="(item,key,index) in records" @click="select($event)" ref="item">
          <p @click="post(index,key)">{{key}}</p>
          <i></i>
        </div>
      </div>
    </transition>
    <transition name="fade" v-if="records !== null">
      <div class="select" @touchmove.prevent v-show="isShowField" @click="hidden">
        <div class="select-item" v-for="(item,times,index) in records[times]" @click="select($event)" ref="item">
          <p @click="postTimes(item.content)">{{item.name}}</p>
          <i></i>
        </div>
      </div>
    </transition>
    <div class="mask" @touchmove.prevent v-show="isShowDay" @click="hidden"></div>
    <div class="comment_list">
      <mu-list>
        <comment-item :comments="comments" :cateid="cateid" :objid="objid"></comment-item>
      </mu-list>
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>    
    <div class="footer" @click="goComment(objid, cateid)">
      发表评论
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content: '',
        isClicked: false,
        isDay: false,
        isField: false,
        isShowDay: false,
        isShowField: false,
        data: {},
        comments: [],
        objid: null,
        cateid: null,
        share: false,
        mask: false,
        records: {},
        times: '',
        collected: null,
        collectCateid: null,
        scroller: null,
        loading: false,
        page: 1,
        pagesize: 10,
        imgSrc: global.imgSrc
      }
    },
    methods: {
      goMap(name, addr, lat, lng) {
        this.$router.push({
          name: 'navMap', params: { name: name, addr: addr, lat: lat, lng: lng }
        })
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
              data:'objid='+this.objid+'&cate_id='+this.cateid,
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
        this.$http({
          method:'post',
          data:'objid='+this.objid+'&cate_id='+this.collectCateid+'&action=add',
          url:global.url+'/api/focus',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
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
      Share() {
        this.share = !this.share
        this.mask = !this.mask
        document.removeEventListener("touchmove", function (e) {
          e.preventDefault()
        }, false)
      },
      hiddenShare() {
        this.share = false
        this.mask = false
      },
      goComment(objid, cateid) {
        this.$router.push({
          name: 'comment', params: { objid: objid, cateid: cateid }
        })
      },
      callphone(tel) {
        window.location.href = "tel:" + tel
      },
      hidden() {
        this.isShowDay = false
        this.isShowField = false
        this.isDay = false
        this.isField = false
      },
      day() {
        this.isDay = !this.isDay
        this.isShowDay = !this.isShowDay
        this.isField = false
        this.isShowField = false
      },
      field() {
        this.isField = !this.isField
        this.isShowField = !this.isShowField
        this.isDay = false
        this.isShowDay = false
      },
      select(e) {
        this.$refs.item.forEach(item => {
          item.classList.remove('selected')
        })
        e.currentTarget.classList.add('selected')
        setTimeout(this.all, .5)
      },
      post(index, key) {
        this.times = key;
      },
      postTimes(value) {
        console.log(value)
        if (value == null) {
          this.content = '数据暂未更新'
        }
        if(value != null){
          this.content = value
        }
        console.log(this.content)
      }
    },
    mounted() {
      this.scroller = this.$el
      let id = this.$route.params.id
      let weuserid = this.checkLogin(false)
      this.$http({
          method:'post',
          data:'id='+id+'&type=score&weuserid='+weuserid,
          url:global.url+'/api/race',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          if (res.data.code === 1) {
            this.data = res.data.data.data
            this.collected = res.data.data.data.collect.collect
            this.collectCateid = res.data.data.data.collect.id
            this.records = res.data.data.records
            this.content = res.data.data.records.第1天[0].content
            this.objid = res.data.data.data.id
            this.cateid = res.data.data.data.comments[0].id
            console.log(this.data, this.records)
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
  .comment_list {
    margin-bottom: 1.2rem;
  }
  .scorereport {
    position: relative;
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

  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
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

  .select {
    top: 14.5rem;
    left: 0;
    right: 0;
    position: absolute;
    background-color: #fff;
    align-items: center;
    z-index: 999999;
    padding: 0 .407407407rem;
  }

  .select-item {
    height: 1.2962963rem;
    background-color: #fff;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
  }

  .select-item:active {
    background-color: #f0f0f0;
  }

  .select-item p {
    flex: 1;
    font-size: 14px;
  }

  .selected {
    border-bottom: 1px solid rgb(243, 152, 0);
    color: rgb(243, 152, 0);
  }

  .selected i {
    width: .3rem;
    height: .15rem;
    border-left: 2px solid rgb(243, 152, 0);
    border-bottom: 2px solid rgb(243, 152, 0);
    transform: rotate(-45deg);
  }

  span.active {
    color: rgb(243, 152, 0);
  }

  .scorereport .nav i.active {
    border-top: 6px solid transparent;
    border-bottom: 6px solid rgb(243, 152, 0);
    margin-bottom: 3px;
  }

  .mask {
    /*top: 6.2rem;*/
    /*top: 5.5rem;*/
    top: 15.5rem;
    position: absolute;
    /*position: fixed;*/
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: .5;
    z-index: 9999;
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

  .scorereport>img {
    width: .5rem;
    height: .5rem;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999;
    top: .4rem;
    right: .4rem;
  }

  .scorereport .star {
    width: .6rem;
    height: .5rem;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 999;
    top: .4rem;
    right: 1.4rem;
  }

  .scorereport .information {
    padding: .462962963rem .4166666667rem;
    border-bottom: .277777778rem solid #f0f0f0;
  }

  .scorereport .information .title {
    font-size: 16px;
    line-height: 30px;
    margin-bottom: .925925926rem;
  }
  /*.racedetail .information .content {
  font-size: 14px;
}*/

  .scorereport .information span {
    color: #898989;
  }

  .scorereport .race {
    margin-bottom: .44444444rem;
  }

  .scorereport .time {
    float: left;
  }

  .scorereport .grade {
    float: right;
  }

  .scorereport .tip {
    float: right;
    padding: .1rem .240740741rem;
    background-color: #fff;
    border: 1px solid rgb(246, 70, 72);
    border-radius: 3px;
    font-size: 12px;
    color: rgb(246, 70, 72);
  }

  .scorereport .flex-item {
    padding: 0 .4166666667rem;
    height: 1.277777778rem;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
  }

  .scorereport .flex-item img {
    height: .37037037rem;
    width: .37037037rem;
    margin-right: .277777778rem;
  }

  .scorereport .flex-item p {
    flex: 1;
    font-size: 14px;
    white-space: nowrap;
  }

  .scorereport .right {
    border-top: .0462962963rem solid #9b9b9c;
    border-right: .0462962963rem solid #9b9b9c;
    height: .277777778rem;
    width: .277777778rem;
    transform: rotate(45deg);
    /*margin-right: .3977777778rem;*/
  }

  .scorereport .bb {
    border-bottom: .277777778rem solid #f0f0f0;
  }

  .scorereport .nav {
    border-bottom: 1px solid #dcdddd;
    line-height: 1.2962963rem;
  }

  .scorereport .nav-item {
    width: 50%;
    float: left;
    text-align: center;
    font-size: 14px;
    color: rgb(137, 137, 137);
  }

  .scorereport .nav i {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 6px solid rgb(137, 137, 137);
    border-bottom: 6px solid transparent;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    margin-left: .166666667rem;
    margin-bottom: -3px;
  }

  .scorereport .scoredetail {
    min-height: 4rem;
    font-size: 16px;
    padding: .481481481rem .407407407rem;
    border-bottom: .277777778rem solid #f0f0f0;
  }

  .seescore {
    position: relative;
  }

  .scorereport .scoredetail p {
    font-size: 14px;
    line-height: 25px;
  }

  .comment_list {
    margin-bottom: 1.5rem;
  }

  .comment .talking_container {
    border-top: 1px solid #f0f0f0;
  }

  .comment .title {
    font-size: 16px;
    padding-left: .5rem;
    padding: .44444444rem;
    /*border-bottom: 1px solid #f0f0f0;*/
  }

  .msg {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatars {
    flex: 1;
    text-align: center;
    margin-left: .3rem;
    margin-right: .3rem;
  }

  .msg_talk {
    flex: 4;
    display: flex;
    flex-direction: column;
  }

  .avatar {
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
  }

  .lab {
    width: .5rem;
    height: .5rem;
    opacity: .6;
  }

  .comment .name {
    flex: 1;
    margin-bottom: .2rem;
    font-size: 14px;
  }

  .position {
    /*flex: 1;*/
    /*display: flex;
  justify-content: center;
  align-items: center;*/
  }

  .comment .time {
    flex: 1;
    font-size: 14px;
    opacity: .6;
    margin-right: .2777777788rem;
  }

  .city {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .posiCity {
    font-size: 14px;
    opacity: .6;
  }

  .talk_content {
    width: 100%;
    height: 100%;
  }

  .comment .content {
    word-wrap: break-word;
    width: 90%;
    padding: 0 .5rem;
    letter-spacing: .03rem;
    font-size: 14px;
  }

  .other {
    position: relative;
    margin-top: .5rem;
    width: 100%;
    height: 1.2rem;
    border-bottom: 1px solid #F4F5F5;
  }

  .talking_img,
  .like_img {
    width: .5rem;
    height: .5rem;
    padding-top: .15rem;
    flex: 1;
    padding-left: .4rem;
  }

  .talking,
  .like {
    width: 2rem;
    height: .8rem;
    border: 1px solid #f0f0f0;
    text-align: center;
    line-height: .8rem;
    border-radius: .6rem;
    display: flex;
  }

  .talking {
    position: absolute;
    right: .4rem;
  }

  .like {
    position: absolute;
    right: 2.7rem;
  }

  .publish {
    width: 100%;
    height: 1.6rem;
    padding: .2rem 10%;
  }

  .image {
    display: flex;
    width: 100%;
  }
  /*.imgs {
  flex: 1;
  width: 2rem;
  height: 3rem;
  margin: .3rem .2rem;
}*/

  .like_content,
  .talking_content {
    padding-right: .3rem;
    flex: 3;
  }

  .scorereport .footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    height: 1.33333333rem;
    background-color: rgb(243, 152, 0);
    line-height: 1.33333333rem;
    text-align: center;
    color: #fff;
    font-size: 14px;
    z-index: 999;
  }
</style>
