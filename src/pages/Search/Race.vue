<template lang="html">
  <div>
    <div style="height:35px;"></div>
    <div class="race-item" v-for="item in race" :key="item.id" @click="displayDetail(item.id)">
        <div class="title">
          <p class="name">
            {{item.title}}
          </p>
          <p class="amount"><span>总资金：</span>{{item.bonus}}</p>
        </div>
        <div class="detail">
          <div class="race">
            <img src="static/images/racedetails.jpg">
            <p><span>赛级：</span>{{item.type}}</p>
          </div>
          <div class="time">
            <img src="static/images/time.jpg">
            <p><span>时间：</span>{{item.race_begin}} - {{item.race_end}}</p>
          </div>
          <div class="location">
            <img src="static/images/location.jpg">
            <a :href="item.url" @click.stop>
              <p><span>地点：</span>{{item.province}}{{item.city}}{{item.address}}</p>
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return{
      race: []
    }
  },
  methods: {
    displayDetail (id) {
      this.$router.push({
        name: 'racedetail', params: { id: id }
      })
    }
  },
  mounted () {
    let param = new URLSearchParams()
    this.$http({
      method:'post',
      data:'type=race&keyword='+this.$store.getters.search,
      url:global.url+'/api/search',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
    }).then(res => {
      this.race = res.data.data.data
      // console.log(res);
    })
  }
}
</script>

<style lang="css" scoped>
.report {
  border-top: 1px solid #f0f0f0;
  height: .925925926rem;
  font-size: 14px;
  color: #ababab;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}
.report img {
  width: 1.03703704rem;
  height: .38962963rem;
}
.report i {
  margin: 0 .185185185rem;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: #dcdddd;
}
.race-item {
  padding-top: 1rem;
  position: relative;
  margin-bottom: .277777778rem;
  background-color: #fff;
  padding: 0 .462962963rem;
}
.race-item .title {
  border-bottom: 1px solid #f0f0f0;
  line-height: 1.333333333rem;
}
.race-item .name {
  font-size: 14px;
  float: left;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 5.4rem;
}
.race-item .amount {
  float: right;
  color: #f39800;
  font-size: 16px;
}
.race-item span {
  font-size: 13px;
}
.detail {
  padding: .37037037rem 0;
}
.detail div {
  height: .833333333rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
}
.detail img {
  width: .37037037rem;
  height: .37037037rem;
  float: left;
  margin-right: .185185185rem;
}
.detail p {
  float: left;
}
.detail span {
  color: #898989;
  font-size: 13px;
}
.detail .time {
  position: relative;
}
.tip {
  position: absolute;
  height: .833333333rem;
  width: 2.8rem;
  position: absolute;
  right: 0;
  top: 2.4rem;
  color: #fff;
  line-height: .833333333rem;
  padding-left: .4rem;
  border-radius: .833333333rem 0 0 .833333333rem;
}
</style>
