<template lang="html">
  <div class="fishfield">
    <div class="fishfield-item" v-for="(item,index) in lists" :key="item.id" @click="displayDetail(item.id)">
      <div class="main">
        <img v-lazy="item.photo[0]" class="img">
        <div class="intro">
          <div class="name">
            <p>{{item.title}}<img v-show="item.is_renzheng === 1" src="static/images/icon02.jpg"></p>
           <button @click.prevent.stop="clickButton(item.id,index, $event,item.focus)" :class="{active: !item.focus }">
          {{item.focus ? '已关注' : '+ 关注'}}
          </button>
          </div>
          <div class="type">
            <p v-for="(item, index) in item.type" v-if="index <= 2">{{item.name}}</p>
          </div>
          <div class="distance">
            <p v-if="item.unit == '不详'">不详</p>
            <p v-else>{{item.price}}元/{{item.unit}}</p>

            <span  @click.prevent.stop='goMap(item.title, item.address, item.latitude, item.longitude)' style="float:right">
              距离：{{item.distance}}km
            </span>
            <!-- <button><a @click.prevent.stop='goMap(item.title, item.address, item.latitude, item.longitude)' >导航去</a></button> -->
          </div>
        </div>
      </div>
      <div class="recommend" v-show="item.announce.length !== 0">
        <p v-for="item in item.announce" v-show="item !== ''"><span>荐</span>{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  props: ['lists', 'cateid'],
  methods: {
    displayDetail(id) {
      this.$router.push({
        name: 'detail', params: { id: id }
      })
    },
    clickButton(target_id, index, e, focus) {
      let id = target_id
      let weuserid = this.checkLogin(false)
      this.$http({
        method:'post',
        data:'action=add&objid='+id+'&cate_id='+this.cateid+'&weuserid='+weuserid,
        url:global.url+'/api/focus',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          if (res.data.code == 1) {
            btn.classList.remove('active')
            this.lists[index].focus = !this.lists[index].focus
          }
          if (res.data.code == 0) {
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 1200
            });
          }
          if (res.data.code == 2) {
            btn.classList.add('active')
            this.lists[index].focus = !this.lists[index].focus
          }
        })
        .catch(e => {
          console.log(e)
        })
      let btn = e.currentTarget
    },

    goMap(name, addr, lat, lng) {
      this.$router.push({
        name: 'navMap', params: { name: name, addr: addr, lat: lat, lng: lng }
      })
    }
    
  },
  created() {
    this.lists.forEach(list => {
      list.isClicked = false
    })
  },
  mounted() {
  }
}
</script>

<style lang="css" scoped>
a {
  color: #fff;
}

.fishfield-item {
  background-color: #fff;
  margin-bottom: .277777778rem;
}

.fishfield-item .main {
  padding: .425925926rem;
  padding-bottom: .3rem;
}

.fishfield-item .main .img {
  width: 3.7222222rem;
  height: 2.7962963rem;
}

.fishfield-item .main .intro {
  width: 5.05555556rem;
  float: right;
  padding-top: .2777777778rem;
}

.fishfield-item .intro div {
  height: .833333333rem;
}

.fishfield-item .intro p {
  font-size: 12px;
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 2.5rem;
}

.fishfield-item .intro .name img {
  margin-left: .11111111rem;
  width: .314814815rem;
  height: .314814815rem;
}

.fishfield-item .intro button {
  float: right;
  width: 1.85185185rem;
  height: .55555556rem;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #119df8;
}

/*.fishfield-item .intro button span {
  font-size: 14px;
  font-weight: 700;
  margin-right: .1rem;
}*/

.fishfield-item .intro .name button {
  border: 1px solid #898989;
  background-color: #F8F8F8;
  color: #898989;
}

.fishfield-item .intro .name button.active {
  color: #FBAB0B;
  background-color: #343434;
  border: 1px solid #898989;
}

.fishfield-item .intro .distance button {
  background-color: #343434;
  border: 1px solid #898989;
}
.fishfield-item .intro .distance button a{
  color: #FBAB0B; 
}

.fishfield-item .main .type {
  height: 1rem;
}

.fishfield-item .main .type p {
  background-color: #fffcd8;
  border: 1px solid #f39800;
  color: #f39800;
  text-align: center;
  height: .55555556rem;
  line-height: .55555556rem;
  padding: 0 .177777778rem;
  font-size: 12px;
  border-radius: .55555556rem;
  margin-right: .16rem;
  width: 35%;
}

.fishfield-item .recommend {
  border-top: 1px solid #f0f0f0;
  background-color: #fff;
}

.fishfield-item .recommend span {
  font-size: 14px;
  border: 1px solid #f39800;
  padding: 0 .0925925926rem;
  color: #f39800;
  margin-right: .277777778rem;
  border-radius: 3px;
}

.fishfield-item .recommend p {
  padding-left: .425925926rem;
  line-height: .944444444rem;
  font-size: 13px;
  color: #898989;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
