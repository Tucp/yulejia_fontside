<template lang="html">
  <div class="bind allbg header-item">
    <header-item title="绑定手机"></header-item>

    <!-- 已绑定 -->
    <div v-if="hidemobile" style='background: #f0f0f0;'>
      <div class="tel">
        <span>手机号</span>
        <span>{{hidemobile}}</span>
      </div>

      <div class="confirm-btn">
           <button @click="bindMobile()">修改手机号</button>
      </div>
    </div>

    <!-- 未绑定÷ -->
    <div v-if="!hidemobile" style='background: #f0f0f0;'>
      <div class="input">
        <div class="tel">
          <img src="static/images/tel.jpg">
          <input type="number" placeholder="请输入您的手机号"
          @input="checkTel()" required maxlength="11" ref="tel" v-model="mobile" style="padding-left: 0.8rem;">
        </div>
        <div class="vertify">
          <img src="static/images/vertify.jpg">
          <input type="text" placeholder="请输入验证码" minlength="6" maxlength="6"
          ref="vertify" v-model="code">
          <button :disabled="disabled || time > 0" :class="{active: isActive}"
            @click="send()" ref="btn">{{tip}}</button>
        </div>
      </div>
      <div class="confirm-btn">
        <!-- <router-link to="/set/bindok"> -->
          <button @click="checkForm">确定</button>
        <!-- </router-link> -->
      </div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      mobile: '',
      hidemobile: '',
      nowmobile: '',
      code: '',
      disabled: false,
      isActive: false,
      second: 60,
      time: 0
    }
  },

  computed: {
    tip () {
      return this.time > 0 ? this.time : '获取验证码'
    }
  },

  mounted () {
    let weuserid = this.checkLogin()
    this.$http({
        method:'post',
        data:'type=top_message&weuserid='+weuserid,
        url:global.url+'/api/user',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code == 1) {
          this.mobile = res.data.data.data.mobile
          this.nowmobile = res.data.data.data.mobile
          if (res.data.data.data.mobile) {
            let start = this.mobile.slice(0,3)
            let end = this.mobile.slice(-3)
            this.hidemobile = start+' * * * '+end
          }
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    bindMobile(){
      this.hidemobile = ''
    },
    run () {
      this.time = this.second
      this.timer()
    },
    timer () {
      if (this.time > 0) {
        this.time--
        setTimeout(this.timer, 1000)
      }
    },
    // 点击获取
    send () {
      if (this.nowmobile == this.mobile ) {
        Toast({
            message: '已绑定该号码',
            position: 'middle',
            duration: 2000
          })
        return false
      }

      if (this.mobile == '') {
        Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 2000
          })
      }else{
        if (!(/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/).test(this.mobile)) {
          Toast({
            message: '手机号码格式不正确',
            position: 'middle',
            duration: 2000
          })
          return false
        }
      }

      let weuserid = this.checkLogin()
      this.$http({
        method:'post',
        data:'type=msm&mobile='+this.mobile+'&weuserid='+weuserid,
        url:global.url+'/api/getinfo',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code == 1) {
          this.disbaled = true
          this.sended()
          Toast({
            message: '发送成功',
            position: 'middle',
            duration: 2000
          })
        }else{
          Toast({
            message: res.data.msg,
            position: 'middle',
            duration: 2000
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
    },

    // 已经点击，正在获取
    sended () {
      this.run()
      this.disabled = false
    },

    // 验证手机号
    checkTel () {
      // let btn = this.$refs.btn
      // 手机号码验证
      if ((/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/).test(this.mobile)) {
        this.isActive = true
        // btn.removeAttribute('disabled')
        this.disabled = false
      } else {
        this.isActive = false
      }
    },

    checkForm () {
      if (this.mobile == '') {
        Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 2000
          })
        return false
      }else{
        if (!(/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/).test(this.mobile)) {
          Toast({
            message: '手机号码格式不正确',
            position: 'middle',
            duration: 2000
          })
          return false
        }
      }

      if (this.nowmobile == this.mobile ) {
        Toast({
            message: '已绑定该号码',
            position: 'middle',
            duration: 2000
          })
        return false
      }

      if (this.code == '') {
        Toast({
            message: '验证码不能为空',
            position: 'middle',
            duration: 2000
          })
        return false
      }
      let weuserid = this.checkLogin()
      this.$http({
        method:'post',
        data:'type=msm&mobile='+this.mobile+'&code='+this.code+'&weuserid='+weuserid,
        url:global.url+'/api/getinfo',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        if (res.data.code == 1) {
          Toast({
            message: '绑定成功',
            position: 'middle',
            duration: 2000
          })
          window.history.go(-1)
        }else{
          Toast({
            message: res.data.msg,
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
    * {
      overflow: hidden;
    }
    .bind{
      height: 500px;
      background: #f0f0f0;
    }
    .input div {
      width: 100%;
      height: 1.31481481rem;
      position: relative;
      border-bottom: 1px solid #f0f0f0;
    }
    .input input {
      width: 100%;
      height: 100%;
      font-size: .407407407rem;
      padding-left: 1.2037037rem;
    }
    .input img {
      position: absolute;
      left: .425925926rem;
    }
    .input .tel img {
      width: .296296296rem;
      height: .462962963rem;
      top: .44444444rem;
    }
    .input .vertify img {
      height: .37037037rem;
      width: .37037037rem;
      top: .481481481rem;
    }
    .input button {
      position: absolute;
      right: .425925926rem;
      top: 0.314814815rem;
      width: 2rem;
      height: .759259259rem;
      /*font-size: .314814815rem;*/
      font-size: 12px;
      z-index: 999;
      /*background-color: #f39800;*/
      border: 0;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      /*padding: 0 .185185185rem;*/
    }
    button.active {
      background-color: #f39800;
    }
    .confirm-btn {
      padding: 0 .425925926rem;
      padding-top: .740740741rem;
      background-color: #f0f0f0;
    }
    .confirm-btn button {
      height: 1.11111111rem;
      width: 100%;
      background-color: #FCAC0D;
      border: 0;
      color: #fff;
      font-size: .407407407rem;
      border-radius: 5px;
    }

    /*绑定成功样式*/
    .bindok {
      font-size: .407407407rem;
    }
    .tel {
      font-size: .407407407rem;
      padding: 0 .425925926rem;
      margin-top: .759259259rem;
      height: 1.31481481rem;
      background-color: #fff;
      line-height: 1.31481481rem;
    }
    .tel span:last-child {
      float: right;
      color: #898989;
    }
    .button {
      margin-top: .740740741rem;
      padding: 0 .425925926rem;
    }
    button {
      height: 1.11111111rem;
      width: 100%;
      background-color: #f0f0f0;
      border: 0;
      color: #119df8;
      font-size: .407407407rem;
      border-radius: 5px;
      border: 1px solid #119df8;
    }
</style>
