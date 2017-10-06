<template lang="html">
  <div class="sharedetail header-item">
    <header-item title="视频分享详情"></header-item>
    <img src="static/images/share.png" class="share">
    <div class="main">
      <div class="info">
        <img src="static/images/list01.jpg">
        <div>
          <p class="name">就叫肖申克</p>
          <p>6小时前</p>
        </div>
      </div>
      <img src="static/images/list01.jpg" class="img">
    </div>
    <div class="praisenum">
      <div class="tip">
        <img :src="isPraise ? 'static/images/praised.png' : 'static/images/nopraise.png'" >
        <p>{{num}}次赞</p>
      </div>
      <router-link to="/good">
        <div class="praises">
          <div>
            <img src="static/images/list01.jpg"
            v-for="(item, index) in 10" v-if="index <= 6">
          </div>
          <i></i>
        </div>
      </router-link>
    </div>
    <div class="comment">
      <div class="tip">
        <img src="static/images/bcomment.png">
        <p>12条评论</p>
      </div>
      <div class="talking_container" v-for="item in 3">
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
    <div class="btn" v-show="!isComment">
      <div @click="comment">
        <img src="static/images/btalk.png" class="bcomment">
        评论
      </div>
      <div @click="praise" :class="{active: isPraise}">
        <img :src="isPraise ? 'static/images/bzaned.png' :
        'static/images/bzan.png'" class="praise">
        点赞
      </div>
    </div>
    <div class="comment_btn" v-show="isComment">
      <input type="text" placeholder="回复楼主" ref="text" @input="log" >
      <img src="static/images/smile.png">
      <button :disabled="!isActive" :class="{active: isActive}" @click="send">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPraise: false,
      isComment: false,
      isActive: false,
      num: 12
    }
  },
  methods: {
    praise () {
      this.isPraise = !this.isPraise
      if (this.isPraise === true) {
        this.num++
      } else {
        this.num--
      }
    },
    comment () {
      this.isComment = !this.isComment
    },
    log () {
      let text = this.$refs.text.value
      if (text !== '') {
        this.isActive = true
      } else {
        this.isActive = false
      }
    },
    send () {
      // console.log(1)
    }
  }
}
</script>

<style lang="css" scoped>
.comment_btn {
  padding-left: .44444444rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.comment_btn input {
  height: .833333333rem;
  width: 6rem;
  border: 1px solid #dcdddd;
  padding-left: .277777778rem;
}
.comment_btn img {
  width: .648148148rem;
  height: .648148148rem;
  margin-right: .277777778rem;
  margin-left: .277777778rem;
}
.comment_btn button {
  width: 1.53703704rem;
  height: .88888889rem;
  background-color: #dcdddd;
  border: 0;
  color: #fff;
  font-size: 14px;
  border-radius: 3px;
}
.comment_btn button.active {
  background-color: #119df8;
}
.btn, .comment_btn {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 1.40740741rem;
  background-color: #f0f0f0;
}
.btn div {
  float: left;
  width: 50%;
  /*text-align: center;*/
  line-height: 1.40740741rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.btn .active {
  color: rgb(243,152,0);
}
.btn .bcomment {
  width: .44444444rem;
  height: .37037037rem;
  margin-right: .2rem;
}
.btn .praise {
  width: .33333333rem;
  height: .388888889rem;
  margin-right: .2rem;
}
.praises {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: 0 .44444444rem;
  height: 1.388888889rem;
  border-bottom: 1px solid #f0f0f0;
}
.praises div {
  overflow: hidden;
  height: .962962963rem;
  width: 7rem;
  flex: 1;
}
.praises img {
  width: .962962963rem;
  height: .962962963rem;
  border-radius: 50%;
  margin-right: .1rem;
}
.praises i {
  border-top: .0462962963rem solid #9b9b9c;
  border-right: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(45deg);
  /*margin-right: .3977777778rem;*/
}
.sharedetail .share {
  width: .5rem;
  height: .5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  top: .4rem;
  right: .4rem;
}
.sharedetail .info {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding-top: .509259259rem;
}
.sharedetail .main {
  padding: 0 .44444444rem;
}
.sharedetail .info img {
  height: 1.2962963rem;
  width: 1.2962963rem;
  border-radius: 50%;
}
.sharedetail .info div {
  margin-left: .277777778rem;
  font-size: 14px;
}
.sharedetail .info p:last-child {
  color: #898989;
}
.sharedetail .img {
  width: 3.68518519rem;
  height: 2.77777778rem;
  margin-top: .44444444rem;
}
.comment {
  margin-bottom: 1.3rem;
}
.sharedetail .tip {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  font-size: 14px;
  align-items: center;
  /*padding-left: .5rem;*/
  padding: .44444444rem .44444444rem 0 .44444444rem;
  color: #119df8;
}
.praisenum .tip img:first-child {
  width: .4rem;
  height: .462962963rem;
  margin-right: .111111111rem;
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
