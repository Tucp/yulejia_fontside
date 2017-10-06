<template lang="html">
  <div class="live">
    <div class="nav">
      <div class="nav-item">
        <router-link to="/live/">
          <span>国赛</span>
        </router-link>
      </div>
      <div class="nav-item">
        <router-link to="/otherlive">
          <span>其他赛事</span>
        </router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.live {
  margin-top: 1.22222222rem;
}
.live .nav {
  height: 1.22222222rem;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
}
.live .nav-item {
  float: left;
  width: 50%;
  text-align: center;
  line-height: 1.22222222rem;
  font-size: 14px;
  overflow: hidden;
}
.live .nav-item span {
  padding: .2rem .44444444rem;
}
.live .router-link-exact-active span {
  border-bottom: 3px solid #119df8;
  border-radius: 3px;
}
</style>
