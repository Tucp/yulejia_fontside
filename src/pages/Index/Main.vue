<template lang="html">
  <div class="main" @touchstart="ts" @touchmove="tm">
    <y-head></y-head>
    <y-navbar></y-navbar>

    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Head from '@/components/Head.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  data () {
    return {
      startX: '',
      startY: '',
      endX: '',
      endY: '',
      direction: ''
    }
  },
  watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.fade = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
},
  methods: {
    onSwipeLeft() {
      this.index++
      if(this.index == 1) {
        this.$router.push('/main/aboutfishing')
      }
      if(this.index == 2) {
        this.$router.push('/main/video')
      }
    },
    ts(e) {
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
    },
    tm(e) {
      this.endX = e.touches[0].pageX
      this.endY = e.touches[0].pageY
      this.direction = this.getDirection(this.startX, this.startY, this.endX, this.endY);
      if(this.direction == 3) {
        this.$store.commit('changeIndex', ++this.index)
        if(this.index == 1) {
          this.$router.push('/main/aboutfishing')
        } else if(this.index == 2) {
          this.$router.push('/main/video')
          this.$store.commit('changeIndex', 3)
        } else if(this.index == 3) {
          this.$router.push('/main/video')
        } else {
          this.$store.commit('changeIndex', 3)
        }
      } else if(this.direction == 4) {
        this.$store.commit('changeIndex', --this.index)
        if(this.index == 2) {
          this.$router.push('/main/aboutfishing')
        } else if(this.index == 1) {
          this.$router.push('/main/')
          this.$store.commit('changeIndex', 0)
        } else if(this.index == 0) {
          this.$router.push('/main/')
        } else {
          this.$store.commit('changeIndex', 0)
        }
      }
    },
    getAngle(angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI;
    },
    getDirection(startx, starty, endx, endy) {
      var angx = endx - startx;
      var angy = endy - starty;
      var result = 0;
      //如果滑动距离太短
      if (Math.abs(angx) < 140 && Math.abs(angy) < 140) {
          return result;
      }
      var angle = this.getAngle(angx, angy);
      if (angle >= -135 && angle <= -45) {
        result = 1;
      } else if (angle > 45 && angle < 135) {
        result = 2;
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
      } else if (angle >= -45 && angle <= 45) {
        result = 4;
      }
      return result;
    }
  },
  computed: {
    localCity() {
      return this.$store.state.selectCity.localCity
    },
    index() {
      return this.$store.state.selector.index
    }
  },
  created () {
    this.$store.dispatch('changeTabbarActive', 0)
  },
  mounted () {
    
  },
  components: {
    'y-head': Head,
    'y-navbar': Navbar
  }
}
</script>

<style lang="css" scoped>
.fide-enter-active,.fide-leave-active{
  transition: all .4s;
}
.fide-enter,.fide-leave-active{
  transform: translateX(-100%);
}
</style>
