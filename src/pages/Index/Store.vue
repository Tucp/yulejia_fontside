<template lang="html">
  <div class="page" style="background-image: url(static/images/no-content.png);background-size: 200px; background-repeat:no-repeat; background-position:center center" >
    <span style="position:absolute; top:65%; right:30%;">玩命开发中，请耐心等待...</span>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('changeTabbarActive', 1)
  }
}
</script>

<style lang="css" scoped>
.Login_content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.login_button {
  position: absolute;
  flex: 3;
  width: 100%;
  bottom: 3.93518rem;
}

.page {
  /*width: 100%;*/
  height: 100vh;
  /*display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  justify-content: center;*/
  padding: 0 10%;
}

.button {
  width: 100%;
  height: 1.33333333rem;
  border-radius: 1.33333333rem;
  background-color: #252525;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button img {
  width: .703703704rem;
  height: .574074074rem;
  margin-right: .277777778rem;
}

.button p {
  font-size: 16px;
  color: #FAC212;
}

.check {
  position: absolute;
  bottom: 1rem;
}

.check .bd {
  width: .55555556rem;
  height: .55555556rem;
  border: 1px solid #252525;
  border-radius: 50%;
  margin-right: .2rem;
  position: relative;
  float: left;
}

.check .bd.active {
  background-color: #252525;
  border: 1px solid #252525;
}

.check a {
  color: #252525;
  text-decoration: none;
}

.check span {
  text-decoration: underline;
}

.check p {
  font-size: 14px;
  color: #252525;
  overflow: hidden;
  float: left;
}

.check i {
  position: absolute;
  width: .3rem;
  height: .15rem;
  border-left: 2px solid #FAD514;
  border-bottom: 2px solid #FAD514;
  transform: rotate(-45deg);
  left: 50%;
  margin-left: -0.15rem;
  top: 50%;
  margin-top: -0.075rem;
}

header {
  height: 1.35185185rem;
  border-bottom: 1px solid #dcdddd;
  /*font-size: .462962963rem;*/
  font-size: 16px;
  background-color: #232323;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  overflow: hidden;
}
header p {
  text-align: center;
  line-height: 1.35185185rem;
  color:#FBAB0B;
}
header i {
  border-top: .0462962963rem solid #FBAB0B;
  border-left: .0462962963rem solid #FBAB0B;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(-45deg);
  position: absolute;
  left: .4259259256rem;
  top: .5rem;
}
</style>

