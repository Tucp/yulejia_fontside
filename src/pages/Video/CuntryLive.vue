<template lang="html">
  <div class="cuntrylive">
    <router-link to="/videodetail">
      <div class="video" style="background: url(static/images/list01.jpg) center center">
        <i onclick="history.go(-1)"></i>
        <div class="play"></div>
      </div>
    </router-link>
    <div class="about">
      <div class="title">
        赛事列表
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
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.video {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  top: 1.22222222rem;
  width: 100%;
  height: 5rem;
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
.video i {
  border-top: .08rem solid #fff;
  border-left: .08rem solid #fff;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(-45deg);
  position: absolute;
  left: .4259259256rem;
  top: .5rem;
  z-index: 999;
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
  z-index: 999;
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
/*object {
  width: 100%;
  height: 5rem;
}*/
.about {
  margin-top: 5rem;
  padding-bottom: .407407407rem;
  /*border-bottom: .277777778rem solid #f0f0f0;*/
}
.about .title {
  padding: .407407407rem;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}
.about-item {
  padding: .407407407rem .407407407rem 0 .407407407rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.about-item img {
  width: 3.6296293rem;
  height: 2.05555556rem;
}
.about-item .info {
  margin-left: .277777778rem;
  line-height: 25px;
}
.about-item .info p:first-child {
  font-size: 14px;
}
.about-item .info p:last-child {
  color: #898989;
}
</style>
