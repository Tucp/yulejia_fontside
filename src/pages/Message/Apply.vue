<template lang="html">
  <div class="apply allbg">
    <div class="parise_list">
      <div class="parise_list-item" v-for="(item,index) in datas" :key="item.id">
        <div class="title" @click="member(item.userid, item.focus ,item.befocus, item.headimg, item.nickname)">
          <span>
            <img :src="imgSrc+item.headimg"
        v-if="(item.headimg).indexOf('http') === -1">
          <img :src="item.headimg" v-else>
          </span>
          <div>
            <p class="nick">{{item.nickname}}</p>
            <p class="time">{{item.create_time}}</p>
          </div>
        </div>
        <!-- <p class="tip">
          走起走起走起走起走
        </p> -->
        <div class="intro" v-html="item.content" @click="displayDetail(item.id)">
        </div>
        <span class="lz" @click="member(item.userid, 1 ,1, item.headimg, item.nickname)">
          楼主
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: [],
      imgSrc: global.imgSrc
    }
  },
  mounted () {
    let weuserid = this.checkLogin(false)
    this.$http({
        method:'post',
        data:'type=myjoin_yuediao_assign&weuserid='+weuserid,
        url:global.url+'/api/user',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        this.datas = res.data.data
        console.log(this.datas)
      })
  },
  methods: {
    member(id, focus, befocus, headimg, nickname) {
        this.$router.push({
          name: 'person', params: { id: id, focus: focus, befocus:befocus, headimg:headimg, nickname:nickname }
        })
      },
    displayDetail (id) {
      this.$router.push({
        name: 'aboutfishingdetail', params: { id: id }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.lz {
  color: #119df8;
  position: absolute;
  top: .3rem;
  right: .3rem;
  font-size: 14px;
}
.apply {
  margin-top: 1.6rem;
}
.parise_list-item {
  position: relative;
  padding: .277777778rem .425925926rem;
  background-color: #fff;
}
.parise_list-item .title {
  height: 1.2962963rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
}
.parise_list-item .title img {
  height: 1.2962963rem;
  width: 1.2962963rem;
  border-radius: 50%;
  margin-right: .277777778rem;
}
.parise_list-item .title p {
  line-height: .648148148rem;
}
.parise_list-item .nick {
  font-size: 14px;
}
.parise_list-item .time {
  font-size: 12px;
  color: #898989;
}
.parise_list-item .tip {
  margin-top: .277777778rem;
  font-size: 14px;
}
.parise_list-item .tip img {
  height: 14px;
  width: 14px;
  margin-right: .12962963rem;
}
.parise_list-item .intro {
  margin-top: .277777778rem;
  background-color: #f0f0f0;
  padding: .277777778rem .462962963rem;
  font-size: 14px;
}
</style>
