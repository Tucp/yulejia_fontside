<template lang="html">
  <div class="sendfish">
    <div class="sendfish_list" v-for="item in sendfishInfo">
      <div class="sendfish_list-item" @click="toDetail(item.id)">
        <div class="title">
          <img :src="imgSrc+item.headimg" v-if="item.headimg.indexOf('http') === -1">
          <img :src="item.headimg" v-else>
          <div>
            <p class="nick">{{item.nickname}}</p>
            <p class="time">{{item.update_time}}</p>
          </div>
        </div>
        <div class="intro">
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
            <a :href="item.url">
              <p><span>地点：</span>{{item.address}}</p>
            </a>
          </div>
          <div class="contact">
            <div>
              <img src="static/images/people.jpg">
              <span>{{item.asign}}</span>
            </div>
            <div>
              <img src="static/images/msg.png">
              <span>{{item.comments}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sendfishInfo: '',
        imgSrc:global.imgSrc
      }
    },
    methods: {
      toDetail(objid) {
        console.log(objid)
        this.$router.push({
          name: 'aboutfishingdetail', params: { id: objid }
        })
      }
    },
    mounted() {
      let id = this.$route.params.id
      this.$http({
        method:'post',
        data:'userid='+id+'&type=yuediao',
        url:global.url+'/api/user',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
          console.log(res)
          if (res.data.code == '1') {
            this.sendfishInfo = res.data.data
          }
        })
    }
  }

</script>

<style lang="css" scoped>
.sendfish_list-item {
  padding: .462962963rem .407407407rem 0 .407407407rem;
  background-color: #fff;
  font-size: .33333333rem;
  position: relative;
  overflow: hidden;
}

.title {
  height: 1.2962963rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
}

.title img {
  width: 1.2962963rem;
  height: 1.2962963rem;
  border-radius: 50%;
  margin-right: .268518519rem;
}

.title div {
  flex: 1;
}

.title div p {
  line-height: .601851852rem;
}

.title div p:last-child {
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
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*.information div:not(:last-child) {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
}*/
.information {
  display: flex;
  flex-direction: column;
}
.information div {
  line-height: 1rem;
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
.location {
  position: relative;
}
.contact {
  position: absolute;

  right: 0;
  bottom: 0;
}

.contact div {
  float: left;
  margin-right: .33333333rem;
  color: #898989;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact div img {
  height: .44444444rem;
  width: .55555556rem;
}
.didian {
  width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
