<template lang="html">
  <div class="raceindex header-item allbg">
    <transition name="slide-bottom">
      <div class="select" @touchmove.prevent v-show="isShow">
        <div class="select-item" v-for="item in types"
        @click="select($event, item)" ref="item">
          <p>{{item.name}}</p>
          <i></i>
        </div>
      </div>
    </transition>
    <div class="mask" v-show="isShow" @click.prevent @click="all"></div>
    <header-item title="赛事" path="/main/"></header-item>
    <router-link to="/startR">
      <img src="static/images/search.png" class="imgs">
    </router-link>
    <div class="nav">
      <div class="nav-item all" @click="all">
        <span :class="{active: isActive}">全部赛事</span>
        <i :class="{active: isActive}"></i>
      </div>
      <div class="nav-item" :class="{active: isApply}" @click="raceApply">
        <span>赛事报名</span>
      </div>
      <div class="nav-item" :class="{active: isScore}" @click="scoreReport">
        <span>成绩报道</span>
      </div>
    </div>
    <!-- <router-view></router-view> -->
    <div class="race-item">
      <race-item tip="截止报名" bgc="rgb(246,70,72)" :race="race" v-show="isApply === true"></race-item>

      <race-item tip="查看成绩" bgc="rgb(243,152,0)" v-show="isScore === true" :race="score"></race-item>
    </div>
  </div>
</template>

<script>
import Race from '../Search/Race'
export default {
  components: {
    'race': Race
  },
  data () {
    return {
      race: [],
      score: [],
      isActive: false,
      isShow: false,
      isSelect: false,
      types: [],
      isApply: true,
      isScore: false,
      type:'isApply',
    }
  },
  methods: {
    raceApply () {
      this.isApply = true
      this.isScore = false
      this.isShow = false
      this.isActive = false
    },
    scoreReport () {
      this.isApply = false
      this.isScore = true
      this.isShow = false
      this.isActive = false
    },
    all () {
      this.isActive = !this.isActive
      this.isShow = !this.isShow
      this.isApply = !this.isApply
      this.isScore = false
    },
    select (e, item) {
      this.all()
      this.$refs.item.forEach(item => {
        item.classList.remove('selected')
      })
      e.currentTarget.classList.add('selected')

      this.$http({
        method:'post',
        data:'cate_id='+item.id+'&get_cate=true',
        url:global.url+'/api/race',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code === 1) {
            this.race = res.data.data.data
          }
      })
      .catch(e => {
        console.log(e)
      })

      this.$http({
        method:'post',
        data:'cate_id='+item.id+'&get_cate=true&type=score',
        url:global.url+'/api/race',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code === 1) {
            this.score = res.data.data.data
          }
      })
      .catch(e => {
        console.log(e)
      })
    }
  },
  mounted () {

    this.$http({
        method:'post',
        url:global.url+'/api/race',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code === 1) {
            this.race = res.data.data.data
          }
      })
      .catch(e => {
        console.log(e)
      })

    this.$http({
        method:'post',
        data:'get_cate=true&type=score',
        url:global.url+'/api/race',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code === 1) {
            this.types = res.data.data.cate
            this.score = res.data.data.data
          }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.raceindex {
  height: 100vh;
  background-color: #f0f0f0;
}
.raceindex .race-item {
  margin-top: 1.31481481rem;
}
.slide-bottom-enter-active {
  transition: all .3s ease;
}
.slide-bottom-leave-active {
  transition: all .25s ease-out;
}
.slide-bottom-enter, .slide-bottom-leave-active {
  transform: translateX(-180px);
  opacity: 0;
}
.select {
  top: 2.7rem;
  width: 100%;
  left: 0;
  right: 0;
  position: fixed;
  background-color: #fff;
  align-items: center;
  /*z-index: 999;*/
  padding: 0 .407407407rem;
  z-index: 10000;
}
.select-item {
  height: 1.2962963rem;
  /*background-color: #fff;*/
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}
.select-item:active {
  background-color: #f0f0f0;
}
.select-item p {
  flex: 1;
  font-size: 14px;
}
.selected {
  border-bottom: 1px solid rgb(243,152,0);
  color: rgb(243,152,0);
}
.selected i {
  width: .3rem;
  height: .15rem;
  border-left: 2px solid rgb(243,152,0);
  border-bottom: 2px solid rgb(243,152,0);
  transform: rotate(-45deg);
}
.mask {
  position: fixed;
  top: 2.7rem;
  width: 100%;
  height: 100%;
  background-color: #808080;
  filter:alpha(Opacity=60);
  -moz-opacity:0.6;
  opacity: 0.6;
  overflow-y: hidden;
  z-index: 99;
}
.all i {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 6px solid rgb(137,137,137);
  border-bottom: 6px solid transparent;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  margin-left: .166666667rem;
  margin-bottom: -3px;
}
.raceindex .nav-item  span.active{
  color: rgb(243,152,0);
}
.all  i.active {
  border-top: 6px solid transparent;
  border-bottom: 6px solid rgb(243,152,0);
  margin-bottom: 3px;
}
.imgs {
  width: .5rem;
  height: .5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  top: .5rem;
  right: .4rem;
}
.raceindex .nav {
  height: 1.31481481rem;
  border-bottom: 1px solid #dcdddd;
  position: fixed;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #fff;
  z-index: 99;
  /*top: 1.35185185rem;*/
}
.raceindex .nav-item {
  float: left;
  width: 33.333333%;
  text-align: center;
  line-height: 1.31481481rem;
}
.raceindex .nav-item span {
  color: #898989;
  font-size: 14px;
}
/*.raceindex .nav-item .router-link-exact-active span {
  color: rgb(243,152,0);
}*/
.raceindex .nav-item.active span {
  color: rgb(243,152,0);
}
</style>
