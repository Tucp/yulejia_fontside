<template lang="html">
  <div class="head" style="background: url(static/images/list04.jpg);background-size: cover;">
    <router-link to="/myinfo">
      <!-- <img src="static/images/0.gif" class="avatar"> -->
      <img :src="isClick ? 'static/images/0.gif' : avatar " class="avatar"
      v-if="avatar.indexOf('http') !== -1">
      <img :src="isClick ? 'static/images/0.gif' : imgSrc+avatar " class="avatar" v-else>
    </router-link>
    <p class="name" @click="goLogin">{{text}}</p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      isClick: true,
      isMessage: null,
      imgSrc: global.imgSrc
    }
  },
  computed: {
    avatar() {
      return this.$store.state.touImg.avatar
    }
  },
  methods: {
    goLogin() {
      if (this.text === '登录') {
        this.$router.push({
          path: '/login'
        })
      }
      return false
    }
  },
  mounted() {
    let weuserid = this.checkLogin()
    this.$http({
      method: 'post',
      data: 'type=top_message&weuserid=' + weuserid,
      url: global.url+'/api/user',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).then(res => {
      if (res.data.code === 1) {
        this.isMessage = res.data.data.top_message
      }
    })
      .catch(e => {
        console.log(e)
      })

    this.$http({
      method: 'post',
      data: 'weuserid=' + weuserid,
      url: global.url+'/api/user',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).then(res => {
      if (res.data.code == 1) {
        this.text = res.data.data.data.nickname
        this.$store.commit('selectAvatar', res.data.data.data.headimg)
        this.isClick = false
      } else {
        this.text = '登录'
      }
    })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.head {
  height: 3.72222222rem;
  width: 100%;
  background-color: #000;
  text-align: center;
  padding-top: .555555556rem;
  /*background: url(static/imagesst04.jpg) center center;*/
  position: relative;
}

.avatar {
  margin: 0 auto;
  height: 1.98148148rem;
  width: 1.98148148rem;
  border: .111111111rem solid #a0c5ea;
  border-radius: 50%;
}

.name {
  margin-top: .185185185rem;
  font-size: .407407407rem;
  color: #fff;
}

.message {
  position: absolute;
  right: .462962963rem;
  top: .462962963rem;
  width: .666666667rem;
  height: .62962963rem;
}
</style>
