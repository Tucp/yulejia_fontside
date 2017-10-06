<template lang="html">
<div class="city header-item">
  <header-item title="选择城市"></header-item>
  <div class="sousuo">
    <div class="find">
      <img src="static/images/sousuo.png" alt="">
      <input type="text" class="input" @input="input" v-model="searchCity" placeholder="请输入城市名">
    </div>
  </div>
  <div v-if="showSearchCity === true" class="showCity">
    <div v-if="this.showCity.length === 0" class="explain">你搜索的城市不存在，请重新输入~</div>
    <div class="cityList" v-for="(city,index) in showCity" @click="chooseSearchCity(index)">{{city}}</div>
  </div>
  <div v-if="showSearchCity === false" class="position_city">
    <p>当前定位城市</p>
    <div class="local" @click="posiCity">
      <img src="static/images/city.png" alt="">
      <p class="posiCity">{{nowCity}}</p>
    </div>
  </div>
  <div v-if="showSearchCity === false" class="group">
    <div class="title" id="A">A</div>
    <a name="city-first"></a>
      <div v-for="item in arrA" key="item" @click="isSelect (item)">
        <transition name="slide-bottom">
          <div class="group_city cit">
            <span>{{item}}</span>
          </div>
        </transition>
      </div>
    <div class="title" id="B">B</div>
    <div v-for="item in arrB" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="C">C</div>
    <div v-for="item in arrC" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="D">D</div>
    <div v-for="item in arrD" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="E">E</div>
    <div v-for="item in arrE" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="F">F</div>
    <div v-for="item in arrF" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="G">G</div>
    <div v-for="item in arrG" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="H">H</div>
    <div v-for="item in arrH" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="J">J</div>
    <div v-for="item in arrJ" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="K">K</div>
    <div v-for="item in arrK" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="L">L</div>
    <div v-for="item in arrL" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="M">M</div>
    <div v-for="item in arrM" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="N">N</div>
    <div v-for="item in arrN" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="P">P</div>
    <div v-for="item in arrP" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="Q">Q</div>
    <div v-for="item in arrQ" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="R">R</div>
    <div v-for="item in arrR" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="S">S</div>
    <div v-for="item in arrS" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="T">T</div>
    <div v-for="item in arrT" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="W">W</div>
    <div v-for="item in arrW" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="X">X</div>
    <div v-for="item in arrX" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="Y">Y</div>
    <div v-for="item in arrY" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
    <div class="title" id="Z">Z</div>
    <div v-for="item in arrZ" key="item" @click="isSelect (item)">
      <transition name="slide-bottom">
        <div class="group_city">
          <span>{{item}}</span>
        </div>
      </transition>
    </div>
  </div>
  <div v-if="showSearchCity === false" class="right">
    <div class="letter">当前</div>
    <div class="letter" v-for="letter in letterList" @click="goAnchor(letter)">{{letter}}</div>
  </div>
  <div class="showletter" v-if="show">{{showletter}}</div>
  <!-- <div id="container"></div>
  <div id="tip"></div> -->
</div>
</template>
<script type="text/javascript" src="https://apis.map.qq.com/tools/geolocation/min?key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"></script>
<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      filter: ['南昌','新建','安义','进贤','景德镇','浮梁','乐平','萍乡','莲花','上栗','芦溪','九江','武宁','修水','永修','德安','星子','都昌','湖口','彭泽','瑞昌','新余','分宜','鹰潭','余江','贵溪','赣州','南康','信丰','大余','上犹','崇义','安远','龙南','定南','全南','宁都','于都','兴国','会昌','寻乌','石城','瑞金','宜春','丰城','樟树','高安','奉新','万载','上高','宜丰','靖安','铜鼓','上饶','德兴','广丰','玉山','铅山','横峰','弋阳','余干','鄱阳','万年','婺源','吉安','井冈山','吉安','峡江','新干','永丰','泰和','遂川','万安','安福','永新','抚州','临川','南城','黎川','南丰','崇仁','乐安','宜黄','金溪','资溪','东乡','广昌'],
      // localCity: '',
      showletter: '',
      show: false,
      spreadA: true,
      spreadB: false,
      searchCity: '',
      showCity: [],
      nowCity: this.$store.state.selectCity.localCity,
      showSearchCity: false,
      letterList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      Tob: '',
      AllCity: [],
      arrA: [],
      arrB: [],
      arrC: [],
      arrD: [],
      arrE: [],
      arrF: [],
      arrG: [],
      arrH: [],
      arrJ: [],
      arrK: [],
      arrL: [],
      arrM: [],
      arrN: [],
      arrP: [],
      arrQ: [],
      arrR: [],
      arrS: [],
      arrT: [],
      arrW: [],
      arrX: [],
      arrY: [],
      arrZ: [],
    }
  },
  computed: {
    localCity () {
      return this.$store.state.selectCity.localCity
    }
  },
  methods: {
    posiCity () {
      this.$store.commit('cityS', this.$store.state.selectCity.localCity)
      this.$router.back('-1')
    },
    isSelect (type,index) {
      if (!this.isInArray(this.filter, type)) {
        Toast({
          message: '该城市暂未开通',
          position: 'middle',
          duration: 2000
        })
        return false
      }
      this.$store.commit('cityS', type)
      this.Tob = index
      this.$router.back(-1)
        
      this.$http({
        method:'post',
        data:'city='+this.localCity,
        url:global.url+'/api/yuediao',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          console.log(res)
        })
    },
    isInArray(arr,value){
        for(var i = 0; i < arr.length; i++){
            if(value === arr[i]){
                return true;
            }
        }
        return false;
    },
    goAnchor(selector) {
      if(document.querySelector(`#${selector}`)) {
        var anchor = document.querySelector(`#${selector}`).offsetTop
        document.querySelector('.group').scrollTop = anchor
        this.showletter = selector
        this.show = true
        setTimeout(() => this.show = false,800)
      }
    },
    input() {
      if(this.searchCity != ''){
        setTimeout(() => {
          this.showSearchCity = true
          this.showCity = this.AllCity.filter( city => {
            return city.indexOf(this.searchCity.trim()) > -1
          })
          // console.log(this.showCity)
        }, 800);
      }else {
        this.showSearchCity = false
        this.showCity = []
      }
    },
    chooseSearchCity(index){
      this.$store.commit('cityS', this.showCity[index])
      this.$router.push('/main')
    }
  },
  mounted () {
    // this.$store.commit('selectCity', remote_ip_info["city"])
    this.$http.get('static/city.json')
    .then(res => {
      res.data.filter(item => {
        // this.AllCity.push(item.name)
        // console.log(this.AllCity[1]);
        if (item.pinyin[0] === 'A') {
          this.arrA.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'B') {
          this.arrB.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'C') {
          this.arrC.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'D') {
          this.arrD.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'E') {
          this.arrE.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'F') {
          this.arrF.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'G') {
          this.arrG.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'H') {
          this.arrH.push(item.name)
        }
        if (item.pinyin[0] === 'J') {
          this.arrJ.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'K') {
          this.arrK.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'L') {
          this.arrL.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'M') {
          this.arrM.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'N') {
          this.arrN.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'P') {
          this.arrP.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'Q') {
          this.arrQ.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'R') {
          this.arrR.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'S') {
          this.arrS.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'T') {
          this.arrT.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'W') {
          this.arrW.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'X') {
          this.arrX.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'Y') {
          this.arrY.push(item.name)
          this.AllCity.push(item.name)
        }
        if (item.pinyin[0] === 'Z') {
          this.arrZ.push(item.name)
          this.AllCity.push(item.name)
        }
      })
    })
  }
}
</script>

<style lang="css" scoped>
::-webkit-scrollBar{
  display: none;
}
.header-item {
  margin-top: 1.35185185rem;
}
.city {
  width: 100%;
  height: 100%;
}
.sousuo {
  position: fixed;
  top: 1.35185185rem;
  width: 100%;
  height: 1.6rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

}
.showCity{
  position: fixed;
  top: 2.95185185rem;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  font-size: 0.32rem;
}
.showCity .cityList{
  position: relative;
  padding: 0.266667rem;
}
.showCity .explain{
  padding: 0.266667rem;
  text-align: center;
  background-color: #f0f0f0;
}
.showCity .cityList:after{
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #f0f0f0;
  transform: scaleY(.5);
}
.find {
  width: 90%;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  border-radius: 25px;
  background-color: #f0f0f0;
  margin: .2rem .5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1111111;
}
.input {
  width: 80%;
  height: 1rem;
  background-color: #f0f0f0;
  padding-left: .2rem;
  opacity: .8;
}
img {
  width: .5rem;
  height: .5rem;
}
.position_city {
  position: fixed;
  top: 2.95rem;
  width: 100%;
  background-color: green;
  padding-top: .3rem;
  background-color: #f0f0f0;
  padding-bottom: .2rem;
}
.position_city p {
  margin-left: .5rem;
  font-size: 16px;
  color: #A6A6A6;
}
.local {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: .15rem;
  margin-left: .5rem;
  font-size: 15px;
  width: 2.8rem;
  height: 1rem;
  background-color: #fff;
  border: 1px solid #E1E2E1;
}
p.posiCity {
  margin-left: .3rem;
  color: #1E9BDD;
}
.title {
  width: 100%;
  line-height: 1rem;
  background-color: #F0F0F0;
  font-size: 20px;
  color: rgba(40, 40, 40, 0.5);
  padding-left: .5rem;
  border-bottom: 1px solid #E5E5E5;
}
.right {
  position: fixed;
  height: 70%;
  width: 1rem;
  right: .1rem;
  top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.letter {
  width: 100%;
  text-align: center;
  flex: 1;
  color: #119EF8;
}
.group_city {
  width: 100%;
  border-bottom: 1px solid #E5E5E5;
  line-height: 1rem;
  padding-left: .5rem;
}
.slide-bottom-enter-active {
  transition: all .3s ease;
}
.slide-bottom-leave-active {
  transition: all .3s ease-out;
}
.slide-bottom-enter, .slide-bottom-leave-active {
  transform: translateY(-180px);
  opacity: 0;
}
#container {
  width: 100%;
  height: 300px;
}
#tip {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;
  /*background-color: green;*/
  z-index: 111111;
}
.group {
  /*padding-top: 4.6rem;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;*/
  /*box-sizing: border-box;
  padding: 4.6rem 0 0;
  width: 100%;
  height: 1000px;
  overflow-x: hidden;
  overflow-y: scroll;*/
  position: fixed;
  top: 5.2500185185rem;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
.showletter{
  position: fixed;
  padding: 0.4rem 0.933333rem;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
  background: #099fde;
  font-size: 18px;
}
</style>
