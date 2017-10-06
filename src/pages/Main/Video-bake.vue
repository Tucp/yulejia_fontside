<template lang="html">
  <div class="videoindex">
    <router-link to="/publishvideo">
      <div class="addfishfield">
        <p class="a">
          +
          <p class="text">发布视频</p>
        </p>
      </div>
    </router-link>
    <div class="mask"></div>
    <div class="letter">
      钓鱼乐趣无穷，你还在等什么！你还在等什么！
    </div>
    <y-banner></y-banner>
    <div class="member">
      <span class="member_msg">
        <img src="static/images/match.png" alt="" class="imgs">
        <label>赛事直播</label>
      </span>
      <router-link to="/live"><span class="member_other">查看全部赛事 <div class="other"></div></span></router-link>
    </div>
    <div class="details">
      <div class="summary">
        <img src="static/images/list01.jpg" alt="">
        <span>楚乔传 TV版</span>
        <span>燕询造反百姓伤 归北之战</span>
      </div>
      <div class="summary">
        <img src="static/images/list02.jpg" alt="">
        <span>楚乔传 TV版</span>
        <span>燕询造反百姓伤 归北之战</span>
      </div>
    </div>
    <div class="bar"></div>
    <div class="member">
      <span class="member_msg">
        <img src="static/images/blue_video.png" alt="" class="imgs">
        <label>热门视频</label>
      </span>
      <router-link to="/hotvideo"><span class="member_other">观看直播 <div class="other"></div></span></router-link>
    </div>
    <div class="details">
      <div class="summary">
        <img src="static/images/list01.jpg" alt="">
        <span>楚乔传 TV版</span>
        <span>燕询造反百姓伤 归北之战</span>
      </div>
      <div class="summary">
        <img src="static/images/list02.jpg" alt="">
        <span>楚乔传 TV版</span>
        <span>燕询造反百姓伤 归北之战</span>
      </div>
    </div>
    <div class="bar"></div>
    <div class="member">
      <span class="member_msg">
        <img src="static/images/blue_share.png" alt="" class="imgs rotate">
        <label>视频分享</label>
      </span>
      <router-link to="/videoshare"><span class="member_other">更多<div class="other"></div></span></router-link>
    </div>
    <div class="groups">
      <div class="group" v-for="item in 7">
        <img src="static/images/list02.jpg" alt="">
        <span class="group_name">燕询造反百姓伤</span>
        <span class="gaer">
          <img src="static/images/list01.jpg" alt="" class="avatar">
          <span class="names">肖申克</span>
          <div class="another">
            <img src="static/images/like.png" alt="">
            <span class="num">65</span>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner.vue'
export default {
  created () {
    this.$store.dispatch('changeNavbarActive', 2)
  },
  components: {
    'y-banner': Banner
  },
  mounted() {
    this.$store.commit('changeIndex', 3)
  }
}
</script>

<style lang="css" scoped>
.addfishfield {
  width: 1.8rem;
  height: 1.8rem;
  position: fixed;
  z-index: 999;
  right: .45rem;
  bottom: 1.6rem;
  color: #fff;
  background-color: #119df8;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 15px 5px rgb(99,191,250);
  box-shadow: 0 0 15px 5px rgb(99,191,250);
  overflow: hidden;
}
.addfishfield > p {
  font-size: 25px;
  text-align: left;
  height: .8rem;
  text-align: center;
  overflow: hidden;
  /*line-height: .7rem;*/
}
.addfishfield .text {
  font-size: 13px;
  /*transform: scale(.8);*/
  text-align: center;
}
.videoindex {
  position: relative;
  padding-bottom: 1.40740741rem;
}
.member {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0 .4rem;
  font-size: 16px;
  line-height: 1.2rem;
  border-bottom: 1px solid #F0F0F0;
}
.other {
  position: absolute;
  right: .5rem;
  top: .45rem;
  width: .3rem;
  height: .3rem;
  border-top: 1px solid #808080;
  transform: rotate(45deg);
  border-right: 1px solid #808080;
}
.member_other {
  padding-right: .5rem;
  opacity: .5;
  font-size: 14px;
}
.member_msg {
  display: flex;
  justify-content: center;
  align-items: center;
}
.member_msg label {
  font-size: 14px;
}
.imgs {
  height: .5rem;
  margin-right: .2rem;
}
.details {
  width: 100%;
  display: flex;
  margin: .4rem .4rem .2rem .4rem;
}
.summary {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 6rem;
}
.summary:nth-child(1) {
  margin-right: .4rem;
}
.summary:nth-child(2) {
  margin-right: .8rem;
}
.summary img {
  flex: 4;
}
.summary span {
  flex: 1;
  display: flex;
  font-size: 14px;
}
.summary span:nth-child(3) {
  opacity: .7;
  display: inline-block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  /*width: .8rem;*/
}
.summary span:nth-child(2) {
  display: flex;
  align-items: center;
}
.bar {
  width: 100%;
  height: .3rem;
  background-color: #F0F0F0;
}
.group {
  width: 47.5%;
  padding-bottom: .15rem;
}
.group:nth-child(2n-1) {
  margin-right: .4rem;
}
.group img {
  width: 100%;
  height: 4rem;
}
.group span {
  display: block;
  font-size: 14px;
}
.group > span:nth-child(1) {
  margin-top: .3rem;
}
.groups {
  display: flex;
  flex-wrap: wrap;
  padding: .2rem .4rem;
}
.group_name {
  padding: .15rem.2rem;
  font-size: 15px;
}
.group .gaer {
  display: flex;
}
.gaer .avatar {
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  margin-left: .15rem;
  margin-right: .3rem;
}
.another img {
  width: .5rem;
  height: .5rem;
  padding-right: .1rem;
}
.group .gaer .names {
  padding-right: .6rem;
}
.another {
  display: flex;
}
.rotate {
  display: block;
  transform: rotate(180deg);
}
.mask {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 1.4rem;
  top: 5.72962963rem;
  /*background-color: #302624;*/
  border: none;
  background-image: linear-gradient(
  to top,
  rgba(0,0,0,1) 0%,
  rgba(0,0,0,.8) 20%,
  rgba(0,0,0,0.6) 40%,
  rgba(0,0,0,0.4) 60%,
  rgba(0,0,0,0.2) 80%,
  rgba(0,0,0,0) 100%);
  z-index: 100;
}
.letter {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: 5.8rem;
  border: none;
  color: #FFFFFF;
  font-size: 15px;
  padding-left: .2rem;
  z-index: 100;
}
.group_name {

}
</style>
