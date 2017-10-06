<template lang="html">
  <div class="video_detail header-item">
    <div class="mask_div" v-show="mask" @click="hidden"></div>
    <transition name="slide-bottom">
      <div class="share_msg" v-show="share">
        <div class="weixin sshare"><img src="static/images/weixin.png" alt="" class="weixin picc"><span>微信</span></div>
        <div class="firend sshare"><img src="static/images/friendzone.png" alt="" class="friend picc"><span>朋友圈</span></div>
        <div class="weibo sshare"><img src="static/images/weibo.png" alt="" class="weibo picc"><span>微博</span></div>
        <div class="qq sshare"><img src="static/images/qq.png" alt="" class="qq picc"><span class="qq_right">QQ</span></div>
        <div class="qqzone sshare"><img src="static/images/qqzone.png" alt="" class="qqz picc"><span class="zone">QQ空间</span></div>
      </div>
    </transition>
    <header-item title="赛事报道"></header-item>
    <img src="static/images/share.png" class="share" @click="Share">
    <!-- <div class="video">
      <object data="https://www.youtube.com/embed/F9Bo89m2f6g"></object>
    </div> -->
    <div class="video" style="background: url(static/images/list01.jpg) center center">
      <div class="play">
      </div>
    </div>
    <div class="intro">
      <div class="title">
        十多个vwvdf地方地方地方地方的地方地方
      </div>
      <div class="time">
        <img src="static/images/list01.jpg">
        <p class="time1">
          2017年07月13日 00:52
        </p>
        <div class="parise">
          <img @click="togglePraise"
          :src="isPraise ? 'static/images/praised.png' : 'static/images/nopraise.png' ">
          <span>{{num}}</span>
        </div>
      </div>
      <div class="text">
        都是悲剧人物反对地方反对发
        地方地方东方饭店地方的地方
        发大幅答复地方地方地方df 地方地方地方地方的
          反对地方地方地方   地方地方地方地方的
      </div>
    </div>
    <div class="about">
      <div class="title1">
        相关视频
      </div>
      <router-link to="/videodetail">
        <div class="about-item" v-for="item in 6">
          <img src="static/images/list01.jpg">
          <div class="info">
            <p>三国</p>
            <p>东汉末年分三国，英雄辈出</p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="comment">
      <div class="tip">
        <img src="static/images/bcomment.png">
        <p>12条评论</p>
      </div>
      <div class="talking_container">
        <div class="eveluate">
          <div class="msg">
            <div class="avatars">
              <img src="static/images/list01.jpg" class="avatar"></div>
            <div class="msg_talk">
              <span class="name">肖申克</span>
              <div class="position">
                <span class="time">6小时前</span>
                <div class="city">
                  <img src="static/images/city.png" alt="" class="lab">
                  <p class="posiCity">龙南县国际垂钓中心</p>
                </div>
              </div>
            </div>
          </div>
          <div class="talk_content">
            <div class="content">
            俄格 发布额发的额地方地方地方的发地方的
            反对 戴菲菲 发vfwer 反对地方地方的地方地方
             反对地方地方 地方地方的
            </div>
            <div class="image">
              <img src="" class="imgs">
            </div>
            <div class="other">
              <div class="talking">
                <img src="static/images/talk.png" alt="" class="talking_img">
                <span class="talking_content">评论</span>
              </div>
              <div class="like">
                <img src="static/images/like.png" alt="" class="like_img">
                <span class="like_content">点赞</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <router-link to="/comment">
        <button>
          发表评论
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPraise: false,
      num: 65,
      share: false,
      mask: false
    }
  },
  methods: {
    togglePraise () {
      this.isPraise = !this.isPraise
      if (this.isPraise === true) {
        this.num++
      } else {
        this.num--
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
.mask_div {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #808080;
  filter:alpha(Opacity=60);
  -moz-opacity:0.6;
  opacity: 0.6;
  overflow-y: hidden;
  z-index: 101;
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
.share_msg {
  padding-left: .2rem;
  padding-top: 1.2rem;
  position: fixed;
  width: 100%;
  height: 2.4rem;
  background-color: white;
  z-index: 101;
  top: 1.35185185rem;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}
.sshare {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: .18rem;
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
.video {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 99;
  top: 1.35185185rem;
  height: 5rem;
  width: 100%;
}
.video:before {
  position: absolute;
  content: '';
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  z-index: 999;
  opacity: .5;
}
.video .play {
  position: absolute;
  width: 1.537037037rem;
  height: 1.537037037rem;
  border: 1.5px solid #fff;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin-top: -.76rem;
  margin-left: -.76rem;
  z-index: 99;
  overflow: hidden;
}
.video .play:before {
  position: absolute;
  content: '';
  left: 50%;
  top: 50%;
  margin-top: -15px;
  margin-left: -10px;
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  /*border-right: 15px solid transparent;*/
  border-bottom: 15px solid transparent;
  border-left: 25px solid #fff;
  transform: rotate(0deg);
}
.btn {
  padding: 0 .37037037rem;
  height: 1.66666667rem;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f0f0f0;
  z-index: 99;
  line-height: 1.66666667rem;
}
.btn button {
  width: 100%;
  height: 1.12962963rem;
  background-color: #119df8;
  border: 0;
  color: #fff;
  font-size: 14px;
}
object {
  width: 100%;
  height: 5rem;
}
/*video {
  width: 100%;
  height: 100%;
}*/
.video_detail .share {
  width: .5rem;
  height: .5rem;
  position: fixed;
  right: 0;
  z-index: 999;
  top: .4rem;
  right: .4rem;
}
.video_detail .intro {
  /*position: fixed;*/
  background-color: white;
  margin-top: 5rem;
  z-index: 100;
  padding: .462962963rem .407407407rem;
  border-bottom: .277777778rem solid #f0f0f0;
}
.video_detail .intro .title {
  position: fixed;
  width: 100%;
  padding: 0 .3rem;
  height: 1.4rem;
  left: 0;
  right: 0;
  font-size: 14px;
  top: 6.35rem;
  line-height: 1.4rem;
  background-color: white;
  z-index: 1000;
}
.video_detail .intro .time {
  position: fixed;
  width: 90%;
  padding: 0 .3rem;
  height: 1rem;
  top: 7.75rem;
  left: 0;
  right: 0;
  background-color: white;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  /*align-items: center;*/
  z-index: 1000;
}
.video_detail .intro .time img {
  height: .62962963rem;
  width: .62962963rem;
  border-radius: 50%;
}
.video_detail .intro .time p {
  margin-left: .277777778rem;
  color: #898989;
  flex: 1;
}
.video_detail .intro .time .parise {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  /*align-items: center;*/
  color: #119df8;
}
.video_detail .intro .time .parise img {
  width: .444444444rem;
  height: .444444444rem;
  margin-right: .2rem;
}
.video_detail .intro .text {
  word-wrap: break-word;
  width: 100%;
  padding-top: 1.848148148rem;
  line-height: 25px;
  font-size: 14px;
  color: #898989;
}
.video_detail .about {
  padding-bottom: .407407407rem;
  border-bottom: .277777778rem solid #f0f0f0;
}
.video_detail .about .title1 {
  width: 100%;
  background-color: white;
  padding: .407407407rem;
  font-size: 14px;
  z-index: 100;
  border-bottom: 1px solid #f0f0f0;
}
.video_detail .about-item {
  padding: .407407407rem .407407407rem 0 .407407407rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.video_detail .about-item img {
  width: 3.6296293rem;
  height: 2.05555556rem;
}
.video_detail .about-item .info {
  margin-left: .277777778rem;
  line-height: 25px;
}
.video_detail .about-item .info p:first-child {
  font-size: 14px;
}
.video_detail .about-item .info p:last-child {
  color: #898989;
}
.comment {
  margin-bottom: 1.8rem;
}
.comment .tip {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  font-size: 14px;
  align-items: center;
  /*padding-left: .5rem;*/
  padding: .44444444rem .44444444rem 0 .44444444rem;
  color: #119df8;
}
.comment .tip img {
  width: .462962963rem;
  height: .33333333rem;
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
  /*margin-right: .3rem;*/
}
.msg_talk {
  flex: 4;
  /*display: flex;*/
  flex-direction: column;
  line-height: 25px;
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
  margin-bottom: .5rem;
  font-size: 14px;
}
.position {
  /*flex: 1;*/
  display: flex;
  /*justify-content: center;*/
  /*align-items: center;*/
}
.comment .time {
  /*flex: 1;*/
  font-size: 14px;
  opacity: .6;
  margin-right: .2777777788rem;
}
.city {
  flex: 1.8;
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
.talking_img, .like_img {
  width: .5rem;
  height: .5rem;
  padding-top: .15rem;
  flex: 1;
  padding-left: .4rem;
}
.talking, .like {
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
.like_content, .talking_content {
  padding-right: .3rem;
  flex: 3;
}
</style>
