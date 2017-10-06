<template lang="html">
  <div class="brief">
    <div class="text" v-html="content">

    </div>
    <div class="bar"></div>
    <!--<div class="set">
      <div class="settitle sec">钓场周边服务</div>
      <div class=" group sec">
        <div class="group_1">
          <img src="static/images/meishi.png" class="imgs">
          <div class="name">美食（23）</div>
        </div>
        <div class="group_2">
          <img src="static/images/jingdian.png" class="imgs">
          <div class="name">景点（12）</div>
        </div>
      </div>
      <div class="group sec">
        <div class="group_3">
          <img src="static/images/zhusu.png" class="imgs">
          <div class="name">住宿（50）</div>
        </div>
        <div class="group_4">
          <img src="static/images/jiayou.png" class="imgs">
          <div class="name">加油站（50）</div>
        </div>
      </div>
    </div>-->
    <div class="mask">
        <div class="button" @click="goComment(objid, 6)">发表评论</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      objid: null,
      isLogin: ''
    }
  },
  methods: {
    goComment(objid, cateid) {
      if(this.checkLogin()){
        if (this.isLogin === 1) {
          this.$router.push({
            name: 'comment', params: { objid: objid, cateid: cateid }
          })
        } else if (this.isLogin === 0) {
          this.$router.push({
            name: '/login',
            query: { redirect: '/comment' + '/' + bojid + '/' + cateid }
          })
        }
      }
    }
  },
  mounted() {
    let id = this.$route.params.id
    this.objid = id
    let weuserid = this.checkLogin(false)
    this.$http({
      method:'post',
      data:'id='+id+'&weuserid='+weuserid,
      url:global.url+'/api/getfishing',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
    }).then(res => {
        this.isLogin = res.data.code
        if (res.data.code === 1) {
          this.content = res.data.data.detail.content
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.text {
  padding: .5rem;
  font-size: 14px;
  word-break:normal;
}
/*.title {
  margin: .3rem .4rem;
  font-size: 14px;
  line-height: .8rem;
}
span {
  display: block;
  font-size: 14px;
  line-height: .8rem;
  margin: 0 .4rem;
}
span:nth-child(5) {
  margin-bottom: .5rem;
}*/

.bar {
  width: 100%;
  height: .4rem;
  background-color: #F0F0F0;
}

.set {
  width: 100%;
  height: 4.5rem;
  display: flex;
  flex-direction: column;
}

.sec {
  flex: 1;
  border-bottom: 1px solid #F0F0F0;
}

.settitle {
  font-size: 16px;
  padding-left: .4rem;
  display: flex;
  align-items: center;
}

.group {
  display: flex;
}

.group_1,
.group_2,
.group_3,
.group_4 {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

.imgs {
  width: 1rem;
  height: 1rem;
}

.name {
  margin-left: .45rem;
  opacity: .7;
}

.button {
  position: absolute;
  width: 91.5%;
  height: 1.5rem;
  margin: 1rem .4rem .5rem .4rem;
  background-color: #FCAC0D;
  border-radius: 3px;
  text-align: center;
  line-height: 1.5rem;
  font-size: 15px;
  color: white;
}

.mask {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 3rem;
  background-color: #F0F0F0;
}

.group_2 {
  margin-right: .13rem;
}
</style>
