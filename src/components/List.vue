<template lang="html">
  <div class="container">
    <div class="list">
      <div class="list-item" v-for="(item, index) in lists" :key="item" @click="displayDetail(item.id)">
        <div class="img">
         <!-- <img v-lazy="imgSrc+item.photo[0]"> -->
          <img v-lazy="item.photo[0]">
        </div>
        <div class="name">
          <img src="static/images/icon01.jpg">
          <p>{{item.title}}</p>
          <img v-show="item.is_renzheng === 1" src="static/images/icon02.jpg">
        </div>
        <div class="num">
          <p class="price">{{item.price}}元/{{item.unit}}</p>
          <p></p>
        </div>
        <div class="a-btn">
          <button @click.prevent.stop="clickButton(item.id,index, $event,item.focus)" :class="{active: !item.focus }">
          {{item.focus ? '已关注' : '+ 关注'}}

          </button>

           <!-- <span  @click.prevent.stop='goMap(item.title, item.address, item.latitude, item.longitude)' style="float:right; font-size:12px; line-height:30px;">
              距离：{{item.distance}}km
            </span> -->
          <button><a @click.prevent.stop='goMap(item.title, item.address, item.latitude, item.longitude)'>{{item.distance}}km</a></button>
        </div>
        <div class="types">
          <div>
            <span>类型：</span>
          </div>
          <div>
            <span class="type" v-for="item in item.type">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      latitude: '',
      longitude: '',
      lists: '',
      cateid: null,
      isFocus: true,
      isLogin: '',
      imgSrc: global.imgSrc
    }
  },
  computed: {
    localCity() {
      return this.$store.state.selectCity.localCity
    },
    selectCity() {
      return this.$store.state.selectCity.selectCity ? this.$store.state.selectCity.selectCity : '南昌'
    }
  },
  mounted() {
    // 设置定时器避开返回定位数据时差
    let here = this
    let timevar = setInterval(function(){
        if (here.latitude == '' || here.longitude == '') {
            here.getlocation();
            return false;
        }
        here.getdata()
        window.clearInterval(timevar)
    },300)
  },
  created() {
    window.getlocationinfo = this.getlocationinfo
  },
  methods: {
    getdata(){
      let weuserid = this.checkLogin(false)
      this.$http({
        method:'post',
        data:'city='+this.selectCity+'&is_tui=true&weuserid='+weuserid+'&latitude='+this.latitude+'&longitude='+this.longitude,
        url:global.url+'/api/getfishing',
        header: {  
            "Content-Type": "application/x-www-form-urlencoded"
        },  
      }).then(res=>{
        if (res.data.code === 1) {
          let datas = res.data.data.data
          for (let i = 0; i < datas.length; i++) {
            let photos = datas[i].photo
            for (let j = 0; j < photos.length; j++) {
              photos[j] = this.imgSrc + photos[j]
            }
          }
          this.cateid = res.data.data.focus.id
          this.lists = res.data.data.data
        }
      })
      .catch(e => {
        console.log(e)
      })

    },
    getlocation(){
        // 获取当前位置
        if (window.settings) {
            // app内
            try{
                // 开启定位  type 1 连续定位     2 定位1次（三秒内精度最高一次）
                window.settings.startlocation('2')
            }catch(e){
                alert(e);
            }
        }
    },
    getlocationinfo(locationinfo){
        locationinfo = JSON.parse(locationinfo)
        this.latitude = locationinfo.latitude
        this.longitude = locationinfo.longitude
    },
    goMap(name, addr, lat, lng) {
      this.$router.push({
        name: 'navMap', params: { name: name, addr: addr, lat: lat, lng: lng }
      })
    },
    clickButton(target_id, index, e, focus) {
      let id = target_id
      let weuserid = this.checkLogin(false)
      this.$http({
        method:'post',
        url:global.url+'/api/focus',
        data:'action=add&objid='+id+'&cate_id='+this.cateid+'&weuserid='+weuserid,
        header:{
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res=>{
        if (res.data.code === 0) {
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 1200
            });
          }
          // 判断已经关注的状态
          if (res.data.code === 1) {
            btn.classList.remove('active')
            this.lists[index].focus = !this.lists[index].focus
          }
           // 判断未关注的状态
          if (res.data.code === 2) {
            btn.classList.add('active')
            this.lists[index].focus = !this.lists[index].focus
          }
      })
      .catch(e=>{
        console.log(e)
      })
      let btn = e.currentTarget
    },
    displayDetail(id) {
      this.$router.push({
        name: 'detail', params: { id: id }
      })
    }
  }
}
</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}

a {
  color: #fff;
}

.list {
  column-count: 2;
  column-gap: .4rem;
  border-bottom: .296296296rem solid #f0f0f0;
  padding: .4rem .4rem 0 .4rem;
  margin-bottom: 1.4rem;
  /*box-sizing: border-box;*/
}

@media (min-width: 768px) {
  .list {
    column-count: 3;
  }
}

@media (min-width: 1024px) {
  .list {
    column-count: 4;
  }
}

.list-item {
  background-color: #f7f8f8;
  break-inside: avoid;
  margin-bottom: .4rem;
}

.list-item .img {
  width: 100%;
  height: 2.77777778rem;
  overflow: hidden;
}

.list-item .img img {
  width: 100%;
  height: 100%;
}

.list-item .name {
  text-align: center;
  margin-top: .277777778rem;
  margin-bottom: .351851852rem;
  margin-left: .27777778rem;
  margin-right: .27777778rem;
  height: .5rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

    text-overflow: ellipsis;
    white-space: nowrap;
}

.list-item .name img:first-child {
  width: .5rem;
  height: .425925926rem;
  display: inline-block;
  margin-right: .0925925926rem;
}

.list-item .name p {
  color: #3e3a39;
}

.list-item .name img:last-child {
  width: 15px;
  height: 15px;
  margin-left: .0925925926rem;
}

.list-item .num p:first-child {
  float: left;
  margin-left: .2222222222rem;
}

.list-item .num p:last-child {
  color: #a9a9a9;
  margin-right: .1222222222rem;
  float: right;
}

.list .a-btn {
  height: .8rem;
  overflow: hidden;
  margin-bottom: .314814815rem;
}

.list .a-btn span {
  font-size: 16px;
  font-weight: 700;
  margin-right: 2px;
}

.list-item .a-btn button {
  width: 1.85185185rem;
  line-height: .6rem;
  overflow: hidden;
  border-radius: 2px;
  font-size: 12px;
  margin-top: .1rem;
  margin-bottom: .1rem;
  
}

.list-item .a-btn button:first-child.active {
  color: #FBAB0B;
  background-color: #343434;
  border: 1px solid #898989;
}

.list-item .a-btn button:first-child {
  margin-left: .259259259rem;
  border: 1px solid #898989;
  background-color: #F8F8F8;
  color: #898989;
}

.list-item .a-btn button:last-child {
  margin-left: .11111111rem;
  border: 1px solid #343434;
  background-color: #343434;
}

.list-item .a-btn a{
  color: #FBAB0B; 
}
.list-item .types {
  border-top: 1px dashed #a9a9a9;
  color: #a9a9a9;
  padding: .203703704rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  line-height: 20px;
}

@media (max-width: 320px) {
  .list-item .types {
    height: 1.6rem;
  }
}

.list-item .types div:first-child {
  font-size: 12px;
  float: left;
}

.list-item .types div:last-child {
  flex: 1;
  overflow: hidden;
}

.list-item .types .type {
  margin-right: 5px;
}

/*.more{
  position: fixed;
  bottom: 0;
}*/
</style>

