<template lang="html">
  <div class="aboutfish">
    <div class="aboutfish-item" v-for="item in datas" @click="displayDetail(item.id)">
      <img src="static/images/over.png" class="over" v-if="item.expired === '0'">
      <div class="title">
        <img v-lazy="imgSrc + item.headimg" v-if="item.headimg.indexOf('http') === -1">
        <img v-lazy="item.headimg" v-else>
        <div>
          <div class="nick">
            <p>{{item.nickname}}</p>
            <div class="type" v-if="item.type === 'AA'">费用{{item.type}}</div>
            <div class="type" v-else>{{item.type}}</div>
            <!-- <img src="../../static/images/aa.png" v-if="item.type === 'AA'">
            <img src="../../static/images/a.png" v-else> -->
          </div>
          <div class="time">
            {{item.update_time}}
          </div>
        </div>
      </div>
      <div class="intro" v-html="item.content">
        {{item.content}}
      </div>
      <div class="information">
        <div class="tel">
          <img src="static/images/telephone.jpg">
          <p><span>电话：</span>{{item.tel}}</p>
        </div>
        <div class="time">
          <img src="static/images/time.jpg">
          <p><span>时间：</span>{{item.fishing_time}} {{item.week}}</p>
        </div>
        <div class="location">
          <img src="static/images/location.jpg">
          <a :href="item.url" @click.stop>
            <p><span>地点：</span>{{item.address}}</p>
          </a>
        </div>
        <div class="contact">
          <div>
            <img src="static/images/people.jpg">
            <span>1</span>
          </div>
          <div>
            <img src="static/images/msg.png">
            <span>{{item.comments}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: []
    }
  },
  methods: {
    displayDetail (id) {
      this.$router.push({
        name: 'aboutfishingdetail', params: { id: id }
      })
    }
  },
  mounted () {
    this.$http({
      method:'post',
      data:'type=yuediao&keyword='+this.$store.getters.search,
      url:global.url+'/api/search',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
    }).then(res => {
      this.datas = res.data.data
    })
  }
}
</script>

<style lang="css" scoped>
.aboutfish {
  padding-top: 1rem;
}
.nick .type {
  width: 1.5rem;
  height: .4rem;
  border: 1px solid rgb(243,152,0);
  border-radius: .4rem;
  margin-left: .3rem;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
  color: rgb(243,152,0);
  line-height: .4rem;
}
.over {
  position: absolute;
  right: .462962963rem;
  top: 0;
  width: 1.2rem;
  height: 1rem;
}
.aboutfish-item {
  padding: .462962963rem .407407407rem 0 .407407407rem;
  background-color: #fff;
  font-size: .33333333rem;
  position: relative;
  margin-bottom: .277777778rem;
}
.title {
  height: 1.2962963rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.title img {
  width: 1.2962963rem;
  height: 1.2962963rem;
  border-radius: 50%;
  margin-right: .268518519rem;
}
.title > div {
  flex: 1;
}
.nick {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.nick img {
  width: 1.8rem;
  height: .8rem;
  margin-left: 5px;
}
.title .time {
  color: #898989;
}
.intro {
  margin-top: .462962963rem;
  margin-bottom: .462962963rem;
  background-color: #f0f0f0;
  color: #898989;
  height: .888888889rem;
  line-height: .888888889rem;
  padding: 0 .462962963rem;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.information div {
  height: .44444444rem;
  margin-bottom: .462962963rem;
  overflow: hidden;
}
.information div:not(.contact) {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.information div p span {
  color: #898989;
}
.information .tel p {
  color: #f6b567;
}
.information img {
  width: .37037037rem;
  height: .37037037rem;
  float: left;
  margin-right: .185185185rem;
}
.contact {
  position: absolute;
  right: .33333333rem;
  bottom: .05rem;
}
.contact div {
  float: left;
  margin-right: .33333333rem;
  color: #898989;
}
.contact div img {
  height: .44444444rem;
  width: .55555556rem;
}
.contact div span {
  font-size: 14px;
}
</style>
