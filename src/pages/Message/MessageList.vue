<template lang="html">
  <div class="messagelist allbg header-item">
    <header-item title="私信列表"></header-item>
    <div class="flex-list">
      <router-link to="/chat">
        <div class="flex-item">
          <img src="static/images/list01.jpg">
          <div class="text">
            <p class="nick">钓鱼领跑者</p>
            <p class="message">周末去哪里钓鱼？</p>
          </div>
          <i></i>
          <p class="time">2017-4-20 14:17</p>
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
.flex-item {
  position: relative;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  background-color: #fff;
  height: 1.85185185rem;
  padding: 0 .407407407rem;
}
.flex-item img {
  width: 1.27777778rem;
  height: 1.27777778rem;
  border-radius: 50%;
  margin-right: .277777778rem;
}
.flex-item .text {
  flex: 1;
}
.flex-item .text p {
  line-height: .62962963rem;
}
.flex-item .text .nick {
  font-size: .3888888889rem;
}
.flex-item .text .message {
  font-size: .33333333rem;
  color: #898889;
}
.flex-item i {
  display: block;
  width: .203703704rem;
  height: .203703704rem;
  background-color: #e60012;
  border-radius: 50%;
}
.flex-item .time {
  position: absolute;
  right: .407407407rem;
  top: .277777778rem;
  color: #898989;
}
</style>
