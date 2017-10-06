<template lang="html">
  <div>
    <div class="race-item" v-for="item in race" :key="item.id" @click="displayDetail(item.id)">
        <div class="title">
          <p class="name">
            {{item.title}}
          </p>
          <!-- <p class="amount"><span>总资金：</span>{{item.bonus}}</p> -->
        </div>
        <div class="detail">
          <div class="race">
            <img src="static/images/race-y.png">
            <p><span>赛级：</span>{{item.type}}</p>
          </div>
          <div class="time">
            <img src="static/images/time-y.png">
            <p><span>时间：</span>{{item.race_begin}} - {{item.race_end}}</p>
          </div>
          <div class="location">
            <img src="static/images/location-y.png">
            <a @click.prevent.stop='goMap(item.title, item.address, item.latitude, item.longitude)'>
              <p><span>地点：</span>{{item.province}}{{item.city}}{{item.address}}</p>
            </a>
          </div>
            <div class="tip" :style="{ background: bgc }" v-if="tip === '查看成绩'">
              {{tip}}
            </div>
            <div class="tip" :style="{ background: bgc }" v-else>
              {{item.expired}}{{tip}}
            </div>
        </div>
        <!-- <router-link to=""> -->
          <div class="report" v-if="tip === '查看成绩'" @click.stop="displayRaceReport(item.id)">
            <img src="static/images/report.png" v-if="item.report_status">
            <i class="point" v-if="item.report_status"></i>
            <p  @click.stop.prevent="displayRaceReport(item.id)" v-if="item.report_status">{{item.report_title}}</p>
          </div>
        <!-- </router-link> -->
      </div>
  </div>
</template>

<script>
export default {
  props: ['race', 'tip', 'bgc'],
  methods: {
    goMap(name, addr, lat, lng) {
      this.$router.push({
        name: 'navMap', params: { name: name, addr: addr, lat: lat, lng: lng }
      })
    },
    displayRaceReport (id) {
      console.log(id);
      this.$router.push({
        name: 'racereport', params: { id: id }
      })
    },
    displayDetail (id) {
      if (this.tip === '查看成绩') {
        this.$router.push({
          name: 'scorereport', params: { id: id }
        })
      } else {
        this.$router.push({
          name: 'racedetail', params: { id: id }
        })
      }
    }
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
  width: 8.6rem;
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
  /*padding: .37037037rem 0;*/
  padding-top: .37037037rem;
}
.detail div {
  /*height: .833333333rem;*/
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  margin-bottom: .277777778rem;
}
.detail img {
  width: .37037037rem;
  height: .37037037rem;
  float: left;
  margin-right: .185185185rem;
  margin-top: .1rem;
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
  /*width: 2.8rem;*/
  width: 3.4rem;
  position: absolute;
  right: 0;
  top: 2.4rem;
  color: #fff;
  line-height: .833333333rem;
  /*padding: 0 .2rem 0 .4rem;*/
  padding-left: .4rem;
  border-radius: .833333333rem 0 0 .833333333rem;
}
</style>
