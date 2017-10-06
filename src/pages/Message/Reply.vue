<template lang="html">
  <div class="reply header-item allbg">
    <header-item title="回复我的"></header-item>
    <div class="parise_list">
      <div class="parise_list-item" v-for="item in datas" :key="item.id">
        <div class="title" @click="member(item.userid, item.focus ,item.befocus, item.headimg, item.nickname)">
          <img v-lazy="imgSrc+item.headimg"
        v-if="(item.headimg).indexOf('http') === -1">
          <img v-lazy="item.headimg" v-else>
          <div>
            <p class="nick">{{item.nickname}}</p>
            <p class="time">{{item.create_time}}</p>
          </div>
        </div>
        <p class="tip" v-html="item.rcontent"></p>
        <div class="intro" v-html="item.mcontent">
        </div>
        <button @click="goReply(item.objid, item.cate_id, item.touserid, item.pid)">
          回复
        </button>
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
  methods: {
    member(id, focus, befocus, headimg, nickname) {
        this.$router.push({
          name: 'person', params: { id: id, focus: focus, befocus:befocus, headimg:headimg, nickname:nickname }
        })
      },
    goReply (objid, cateid, userid, pid) {
      this.$router.push({
        name: 'reply', params: { objid: objid, cateid: cateid, userid: userid,
        pid: pid}
      })
    },
    displayDetail(id, cateid, objid, is_zan) {
      this.$store.state.isComment = false
      this.$router.push({
        name: 'commentdetail', params: { id: id, cateid: cateid, objid: objid, 
         is_zan: is_zan }
      })
    },
  },
  mounted () {
    let weuserid = this.checkLogin(false)
    this.$http({
        method:'post',
        data:'type=bereply&weuserid='+weuserid,
        url:global.url+'/api/user',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {
          this.datas = res.data.data.data
        }
      })
  }
}
</script>

<style lang="css" scoped>
button {
  width: 1.4rem;
  height: .8rem;
  position: absolute;
  right: .3rem;
  top: .3rem;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  color: #898989;
}
.parise_list-item {
  position: relative;
  padding: .277777778rem .425925926rem;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0
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
