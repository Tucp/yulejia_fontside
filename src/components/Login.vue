<template lang="html">
  <div class="login">
    <div class="page" style="background-image: url(static/images/bg-login.png);background-size: cover;" >
    <header>
      <i @click="loginGoBack" class="back"></i>
      <p>登录授权</p>
    </header>
      <div class="Login_content">
        <div class="login_button"  @click="login">
          <div class="button">
            <img src="static/images/wechat.png">
            <p>微信一键登录</p>
          </div>
        </div>
        <div class="check">
          <div :class="{active: isActive}" @click="check" class="bd">
            <i v-show="isActive"></i>
          </div>
          <p><router-link to="/readInfo">已阅读并同意 <span>遛鱼《用户使用协议》</span></router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      isActive: true
    }
  },
  mounted() {

  },
  created() {
    window.sharelogin = this.sharelogin
  },
  methods: {
    loginGoBack(){
      this.$router.push('/main')
    },
    check() {
      this.isActive = !this.isActive
      console.log(this.isActive)
    },
    login() {
      if (this.isActive == true) {
        if (window.settings) {
          // app内登陆
          try {
            //type 授权类型  1微信  2 QQ（暂只支持微信）
            window.settings.accreditlogin("1")
          } catch (e) {
            alert(e)
          }
        } else {
          // 微信内
          window.location.href = global.url+'/api/wxlogin.html?jump=' + this.$route.query.redirect || '/main'
        }
      } else {
        Toast({
          message: '请阅读并同意用户使用协议',
          position: 'middle',
          duration: 2000
        })
      }
    },
    sharelogin(type, openid, headimgurl, nickname, sex, city, Province, unionid) {
      this.$http({
        method: 'post',
        data: 'type=app&souquan=' + type + '&openid=' + openid + '&headimgurl=' + headimgurl + '&sex=' + sex + '&city=' + city + '&nickname=' + nickname + '&province=' + Province + '&unionid=' + unionid,
        url: global.url+'/api/wxlogin',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then(res => {
        if (res.data.code == 1) {
          localStorage.setItem('weuserid', res.data.data.weuserid)
          Toast({
            message: res.data.msg,
            position: 'middle',
            duration: 2000
          })
          var that = this;
          setTimeout(function () {
            that.$router.go(-1)
          }, 2100)
        } else if (res.data.code == -1) {
          Toast({
            message: res.data.msg,
            position: 'middle',
            duration: 2000
          })
        } else {
          Toast({
            message: '系统出错',
            position: 'middle',
            duration: 2000
          })
        }
      })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="css" scoped>
.Login_content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.login_button {
  position: absolute;
  flex: 3;
  width: 100%;
  bottom: 3.93518rem;
}

.page {
  /*width: 100%;*/
  height: 100vh;
  /*display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  justify-content: center;*/
  padding: 0 10%;
}

.button {
  width: 100%;
  height: 1.33333333rem;
  border-radius: 1.33333333rem;
  background-color: #252525;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button img {
  width: .703703704rem;
  height: .574074074rem;
  margin-right: .277777778rem;
}

.button p {
  font-size: 16px;
  color: #FAC212;
}

.check {
  position: absolute;
  bottom: 1rem;
}

.check .bd {
  width: .55555556rem;
  height: .55555556rem;
  border: 1px solid #252525;
  border-radius: 50%;
  margin-right: .2rem;
  position: relative;
  float: left;
}

.check .bd.active {
  background-color: #252525;
  border: 1px solid #252525;
}

.check a {
  color: #252525;
  text-decoration: none;
}

.check span {
  text-decoration: underline;
}

.check p {
  font-size: 14px;
  color: #252525;
  overflow: hidden;
  float: left;
}

.check i {
  position: absolute;
  width: .3rem;
  height: .15rem;
  border-left: 2px solid #FAD514;
  border-bottom: 2px solid #FAD514;
  transform: rotate(-45deg);
  left: 50%;
  margin-left: -0.15rem;
  top: 50%;
  margin-top: -0.075rem;
}

header {
  height: 1.35185185rem;
  border-bottom: 1px solid #dcdddd;
  /*font-size: .462962963rem;*/
  font-size: 16px;
  background-color: #232323;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  overflow: hidden;
}
header p {
  text-align: center;
  line-height: 1.35185185rem;
  color:#FBAB0B;
}
header i {
  border-top: .0462962963rem solid #FBAB0B;
  border-left: .0462962963rem solid #FBAB0B;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(-45deg);
  position: absolute;
  left: .4259259256rem;
  top: .5rem;
}
</style>
