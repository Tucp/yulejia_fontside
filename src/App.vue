<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="css">
@import './assets/style/reset.css';
.allbg:before {
  /*position: absolute;*/
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #f0f0f0;
  content: '';
  z-index: -999;
}
.header-item {
  margin-top: 1.35185185rem;
}
* {
  overflow-x: hidden;
}
.el-time-panel{
  position: fixed;
  left: 56%;
}
</style>
