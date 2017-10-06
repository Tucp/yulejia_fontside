<template lang="html">
  <div class="fishannouncement header-item" @touchstart="ts" @touchmove="tm">
    <header-item title="钓协公告" path="/main/"></header-item>
    <router-link to="/startA">
      <img src="static/images/search.png" alt="" class="find">
    </router-link>
    <div class="fishannouncement_nav">
      <div>
          <span @click="hiddena" class="hhh">{{firstPartName}}</span>
          <div class="bar" v-show="a"></div>
          <div class="bar1" v-show="d"></div>
      </div>
      <div>
          <span @click="hiddend" class="hhh">{{secondPartName}}</span>
          <div class="bar" v-show="a"></div>
          <div class="bar1" v-show="d"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './Nav'
export default {
  components: {
    'f-nav': Nav
  },
  data() {
    return {
      startX: '',
      startY: '',
      endX: '',
      endY: '',
      direction: '',
      cateList: [],
      firstPartName: '',
      secondPartName: '',
      cate_id:''
    }
  },
  mounted() {
    this.$store.commit('changeA', true)
    this.$store.commit('changeD', false)

    this.$http({
        method:'post',
        data:'get_cate=1',
        url:global.url+'/api/announce',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.cateList = res.data.data.cate
        this.firstPartName = this.cateList[1].name
        this.secondPartName = this.cateList[0].name
      })
      .catch(e => {
        console.log(e)
      })
  },
  computed: {
    index() {
      return this.$store.state.fish.index
    },
    a() {
      return this.$store.state.fish.a
    },
    d() {
      return this.$store.state.fish.d
    }
  },
  methods: {
    hiddena() {
      // this.a = true
      this.$store.commit('changeA', true)
      // this.d = false
      this.$store.commit('changeD', false)

      this.cate_id = this.cateList[1].id
      this.$router.push({
        path:'/fishannouncement/',
        query:{cate_id:this.cate_id}
      })
    },
    hiddend() {
      // this.d = true
      this.$store.commit('changeD', true)
      // this.a = false
      this.$store.commit('changeA', false)

      this.cate_id = this.cateList[0].id
      this.$router.push({
        path:'/fishannouncement/other',
        query:{cate_id:this.cate_id}
      })
    },
    ts(e) {
      this.startX = e.touches[0].pageX
      this.startY = e.touches[0].pageY
    },
    tm(e) {
      this.endX = e.touches[0].pageX
      this.endY = e.touches[0].pageY
      this.direction = this.getDirection(this.startX, this.startY, this.endX, this.endY);
      if (this.direction == 3) {
        this.$store.commit('changeIndex1', ++this.index)
        if (this.index == 1) {
          this.hiddend()
          this.$router.push('/fishannouncement/other')
        } else {
          this.$store.commit('changeIndex1', 1)
        }
      } else if (this.direction == 4) {
        this.$store.commit('changeIndex', --this.index)
        if (this.index == 0) {
          this.hiddena()
          this.$router.push('/fishannouncement')
        } else {
          this.$store.commit('changeIndex1', 0)
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
      if (Math.abs(angx) < 80 && Math.abs(angy) < 80) {
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
.find {
  position: fixed;
  right: .27rem;
  top: .501rem;
  width: .5rem;
  height: .5rem;
  z-index: 10000;
  opacity: .5;
}
</style>
