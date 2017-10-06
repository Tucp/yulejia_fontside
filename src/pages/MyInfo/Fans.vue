<template lang="html">
  <div class="attention header-item">
    <header-item title="粉丝列表"></header-item>
    <div>
      <div class="item" v-for="item in fansList" :key="item.id"
       @click="displayDetail(item.userid, item.focus ,item.befocus, item.headimg, item.nickname)" >
        <div class="avatar">
          <img :src="item.headimg" class="avatarimg" v-if="item.headimg.indexOf('http')>=0">
          <img :src="imgSrc+item.headimg" class="avatarimg" v-else>
          <img src="static/images/male.jpg" class="sex" v-if="item.sex === 1">
          <img src="static/images/female.jpg" class="sex" v-else>
        </div>
        <div class="info">
          <p>{{item.nickname}}</p>
          <p><span>关注 {{item.focus}}</span><span>粉丝{{item.befocus}}</span></p>
        </div>
        <div class="relationship">
          <img src="static/images/attentionme.jpg">
        </div>
      </div>
    </div>
    <div class="nomore">
      没有更多了 ...
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      fansList: '',
      isMale: true,
      imgSrc: global.imgSrc
    }
  },
  methods: {
    displayDetail(id, focus, befocus, headimg, nickname) {
      this.$router.push({
        name: 'person', params: { id: id, focus: focus, befocus:befocus, headimg:headimg, nickname:nickname }
      })
    },
  },
  computed() {
    if (this.fansList.sex == '1') {
      this.fansList['sexsrc'] = 'static/images/male.jpg'
    } else if (this.fansList.sex == '2') {
      this.fansList['sexsrc'] = 'static/images/female.jpg'
    }

  },
  mounted() {
    let weuserid = this.checkLogin()
    this.$http({
        method:'post',
        data:'type=befocus&weuserid='+weuserid,
        url:global.url+'/api/user',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code == '1') {
          this.fansList = res.data.data.data;
        } else if (res.data.code == '0') {
          this.$router.push({
            path: '/login',
            query: { redirect: '/fans' }
          })
        } else {
          console.log('error')
        }

        console.log(this.fansList)
      }).catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="css" scoped>
.item {
  height: 1.85185185rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: 0 .407407407rem;
  border-bottom: 1px solid #f0f0f0;
}

.item .avatar {
  position: relative;
  height: 1.2962963rem;
  width: 1.2962963rem;
  overflow: hidden;
}

.item .avatar .avatarimg {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.item .avatar .sex {
  position: absolute;
  width: .37037037rem;
  height: .37037037rem;
  right: 0;
  bottom: 0;
  border-radius: 50%;
}

.item .info {
  flex: 1;
  margin-left: .259259259rem;
}

.item .info p {
  line-height: .574074074rem;
}

.item .info p:first-child {
  font-size: .407407407rem;
}

.item .info span {
  color: #898989;
  margin-right: .462962963rem;
  font-size: .351851852rem;
}

.item .relationship img {
  height: .574074074rem;
  width: .574074074rem;
}

.nomore {
  height: 1.2962963rem;
  width: 100%;
  background-color: #f0f0f0;
  text-align: center;
  line-height: 1.2962963rem;
  color: #898989;
  font-size: .296296296rem;
}
</style>
