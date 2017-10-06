<template lang="html">
  <div class="person_head" style="background: url('static/images/list04.jpg');background-size: cover;">
    <i class="back" @click="back"></i>
    <img :src="this.$route.params.headimg" class="avatarimg" v-if="this.$route.params.headimg.indexOf('http')>=0">
    <img :src="imgSrc+this.$route.params.headimg" class="avatarimg" v-else>
    <p class="nick">{{this.$route.params.nickname}}</p>
    <p class="interactive"><span>{{this.$route.params.focus}} 关注</span>|<span>{{this.$route.params.befocus}} 粉丝</span></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      imgSrc: global.imgSrc
    }
  },
  methods: {
    back () {
      if (this.$route.params.focus) {
        this.$router.go(-1)
      } else {
        this.$router.go(-1)
      }

    }
  }
}
</script>

<style lang="css" scoped>
.person_head {
  height: 4.17592593rem;
  text-align: center;
  color: #fff;
  position: relative;
}
.person_head img {
  height: 1.99074074rem;
  width: 1.99074074rem;
  border-radius: 50%;
  border: .111111111rem solid #a0c5ea;
  margin-top: .462962963rem;
}
.person_head .nick {
  margin-top: .128148148rem;
  font-size: .407407407rem;
}
.person_head .interactive {
  margin-top: .145185185rem;
  font-size: .33333333rem;
}
.person_head .interactive span:first-child {
  margin-right: .5rem;
}
.person_head .interactive span:last-child {
  margin-left: .5rem;
}
.person_head i {
  position: absolute;
  top: 0;
  left: 0;
  border-top: .0462962963rem solid #fff;
  border-left: .0462962963rem solid #fff;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(-45deg);
  float: left;
  margin-left: .4259259256rem;
  margin-top: .5rem;
}
</style>
