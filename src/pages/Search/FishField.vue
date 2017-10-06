<template lang="html">
  <div class="fishfield">
    <div class="fishfield-item" v-for="item in lists" :key="item.id" @click="displayDetail(item.id)">
      <div class="main">
        <img :src="imgSrc+ item.photo" class="img">
        <div class="intro">
          <div class="name">
            <p>{{item.title}}<img v-show="item.is_renzheng === 1" src="static/images/icon02.jpg"></p>
            <button @click.prevent.stop="clickButton(item, $event)">+关注</button>
          </div>
          <div class="type">
            <p v-for="(item, index) in item.type" v-if="index <= 2">{{item.name}}</p>
          </div>
          <div class="distance">
            <p>{{item.price}}元/{{item.unit}}</p>
            <button><a :href="item.url" @click.stop>导航去</a></button>
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
export default {
  data () {
    return {
      lists: [],
      keyword: '',
      imgSrc: global.imgSrc
    }
  },
  methods: {
    displayDetail (id) {
      this.$router.push({
        name: 'detail', params: { id: id }
      })
    },
    clickButton (item, e) {
      item.isClicked = !item.isClicked
      let btn = e.currentTarget
      btn.classList.toggle('active')
      if (item.isClicked === false) {
        btn.innerHTML = '+关注'
      } else {
        btn.innerText = '已关注'
      }
      let id = item.id
      this.$http({
        method:'post',
        data:'flag=fishing&objid='+id+'&userid=110',
        url:global.url+'/api/focus',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        // console.log(res.data)
      })
      .catch(e => {
        console.log(e)
      })
    }
  },
  created () {},
  mounted () {
    this.$http({
      method:'post',
      data:'type=fishing&keyword='+this.$store.getters.search,
      url:global.url+'/api/search',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
    }).then(res => {
      this.lists = res.data.data.data
    })
  }
}
</script>

<style lang="css" scoped>
.fishfield {
  padding-top: 1rem;
}
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
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 3rem;
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
  background-color: #fff;
  color: #119df8;
}
.fishfield-item .intro .name button.active {
  color: #898989;
  border: 1px solid #898989;
  /*background-color: #fff;*/
}
.fishfield-item .intro .distance button {
  background-color: #119df8;
  color: #fff;
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
  margin-right: .1rem;
  width: 23%;
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
}
</style>
