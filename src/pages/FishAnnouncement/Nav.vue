<template lang="html">
  <div class="fishannouncement_nav">
    <div>
      <router-link to="/fishannouncement/">
        <span @click="hiddena" class="hhh">裁判员通知</span>
        <div class="bar" v-show="a"></div>
        <div class="bar1" v-show="d"></div>
      </router-link>
    </div>
    <div>
      <router-link to="/fishannouncement/other">
        <span @click="hiddenb" class="hhh">其他公告</span>
        <div class="bar" v-show="a"></div>
        <div class="bar1" v-show="d"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      a: true,
      d: false
    }
  },
  methods: {
    hiddena () {
      this.a = true
      this.d = false
    },
    hiddenb () {
      this.d = true
      this.a = false
    }
  }
}
</script>

<style lang="css" scoped>
.fishannouncement_nav {
  position: fixed;
  background-color: white;
  top: 1.35185185rem;
  z-index: 100;
  left: 0;
  right: 0;
  height: 1.24074074rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
}
.fishannouncement_nav div {
  width: 25%;
  float: left;
  text-align: center;
  line-height: 1.24074074rem;
  font-size: 14px;
  flex: 1;
}
.fishannouncement_nav div span {
  position: relative;
  padding-bottom: .2rem;
}
.hhh {
  position: relative;
  color: #3e3a39;
}
.bar {
  position: absolute;
  width: 20%;
  height: 3px;
  bottom: .2rem;
  left: 12.5%;
  border-radius: 1.5px;
  /*border-radius: 100%;*/
  background-color: #119df8;
}
.bar1 {
  position: absolute;
  width: 16%;
  height: 3px;
  bottom: .2rem;
  right: 12.5%;
  border-radius: 1.5px;
  /*border-radius: 100%;*/
  background-color: #119df8;
}
</style>
