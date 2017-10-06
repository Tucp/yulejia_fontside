<template lang="html">
  <div class="head">
    <header class="header">
      <router-link to="/city">
        <div class="city-position">
          <div v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</div>
          <div v-else>{{localCity}}</div>
          <img src="static/images/arrow-down.png"></img>
          <i></i>
        </div>
      </router-link>
      <div class="search">
        <router-link to="/start">
          <img src="static/images/search.png"></img>
          <input type="search" placeholder="老丁钓场">
        </router-link>
      </div>
      <div class="weather" @click="weather">
        <div class="text">
          <p class="tq">{{wethe[0]['type']}}</p>
          <p class="ds">{{wethe[0].high.substring(2)}}</p>
        </div>
        <i v-if="wethe[0]['type'] == '多云'" class="iconfont icon-duoyun"></i>
        <i v-else-if="wethe[0]['type'] == '晴转多云'" class="iconfont icon-duoyunzhuanyin"></i>
        <i v-else-if="wethe[0]['type'] == '中雨'" class="iconfont icon-zhongyu"></i>
        <i v-else-if="wethe[0]['type'] == '小雨'" class="iconfont icon-xiaoyu"></i>
        <i v-else-if="wethe[0]['type'] == '晴'" class="iconfont icon-qingtian"></i>
        <i v-else-if="wethe[0]['type'] == '雷阵雨'" class="iconfont icon-leizhenyu"></i>
        <i v-else class="iconfont icon-dayu"></i>
      </div>
    </header>
        <div id="allmap"></div>
  </div>
</template>

<script>
import { MP } from '@/library/map'
export default {
  data() {
    return {
      wethe: []
    }
  },
  computed: {
    localCity() {
      return this.$store.state.selectCity.localCity
    },
    selectCity() {
      return this.$store.state.selectCity.selectCity
    }
  },
  methods: {
    weather () {
      this.$router.push('/weather')
    }
  },
  mounted() {
    this.$http({
        method:'post',
        data:'city='+this.selectCity+'&is_tui=true',
        url:global.url+'/api/getfishing',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.wethe = JSON.parse(res.data.data.wether).data.forecast
      })

    this.$http({
        method:'post',
        url:global.url+'/api/local',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.$store.commit('cityN', res.data)
      })


  }
}
</script>

<style lang="css" scoped>
.iconfont {
  font-family: 'iconfont';
  font-size: 20px;
}
.header {
  height: 1.31481481rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #232323;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  padding: 0 .388888889rem;
  overflow: hidden;
  align-items: center;
}
.header .city-position {
  width: 2.21851852rem;
  font-size: 15.27px;
  color:#FBAB0B;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}
.header .city-position img {
  width: .39037037rem;
  height: .30037037rem;
  margin-bottom: -.07rem;
  margin-left: 5px;
}
.weather {
  display: flex;
  align-items: center;
  margin-left: .6rem;
  height: 100%;
  text-align: right;
  color:#FBAB0B;
  font-size: 15.27px;
}
.weather .text {
  font-size: 12px;
  color:#FBAB0B;
}
.weather .iconfont {}
.weather img {
  width: 1.18518519rem;
  height: .555555556rem;
}
.header .search {
  height: 0.851851852rem;
  flex: 1;
  position: relative;
  margin-left: .3rem;
}
.header .search img {
  position: absolute;
  width: .425925926rem;
  height: .425925926rem;
  left: .37037037rem;
  top: .25rem;
}
.header .search input {
  background-color: #343434;
  color:#B5B5B5;
  width: 100%;
  height: 100%;
  border-radius: 0.851851852rem;
  border: 0;
  outline: 0;
  padding-left: .925925926rem;
  font-size: 12px;
}


@font-face {font-family: "iconfont";
  src: url('http://at.alicdn.com/t/font_393126_j2mkuwprvzir7ldi.eot?t=1503397359027'); /* IE9*/
  src: url('http://at.alicdn.com/t/font_393126_j2mkuwprvzir7ldi.eot?t=1503397359027#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('http://at.alicdn.com/t/font_393126_j2mkuwprvzir7ldi.woff?t=1503397359027') format('woff'), /* chrome, firefox */
  url('http://at.alicdn.com/t/font_393126_j2mkuwprvzir7ldi.ttf?t=1503397359027') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('http://at.alicdn.com/t/font_393126_j2mkuwprvzir7ldi.svg?t=1503397359027#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-dayu:before { content: "\e631"; }

.icon-duoyun:before { content: "\e632"; }

.icon-qingtian:before { content: "\e633"; }

.icon-duoyunzhuanyin:before { content: "\e634"; }

.icon-xiaoyu:before { content: "\e635"; }

.icon-zhongyu:before { content: "\e636"; }

.icon-baoyu:before { content: "\e637"; }

.icon-wu:before { content: "\e638"; }

.icon-leizhenyu:before { content: "\e639"; }

.icon-wumai:before { content: "\e63a"; }

.icon-xiaoxue:before { content: "\e63b"; }

.icon-baoxue:before { content: "\e63c"; }

.icon-bingbao:before { content: "\e63d"; }

.icon-daxue:before { content: "\e63e"; }

.icon-leizhenxue:before { content: "\e63f"; }

.icon-yujiaxue:before { content: "\e640"; }

.icon-zhongxue:before { content: "\e641"; }

.icon-feng:before { content: "\e642"; }

.icon-shachen:before { content: "\e643"; }

</style>

