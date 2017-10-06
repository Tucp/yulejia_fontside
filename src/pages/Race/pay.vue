<template lang="html">
  <div class="pay">
    <header>
      <i @click="goBack" class="back"></i>
      <p>缴纳费用</p>
    </header>
    <div class="msg">
      <div class="msg_pic">
        <img :src="imgSrc+ photo" alt="" class="pic">
      </div>
      <div class="msgmap">
        <div class="top">
          <label>{{title}}</label>
          <label>{{price}} x {{num}}</label>
        </div>
        <div class="bottom">
          {{description}}
        </div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="paykind">
      <div class="weixin_pay" v-if="weixin">
        <div class="weixin">
            <img src="static/images/weixinpay.jpg" alt="" class="weixin_img">
        </div>
        <span>微信支付</span>
        <div class="select">
          <div class="circle" @click="select('selct')" :class="{isSelect: Tab ==='selct'}">
            <div class="gou" v-show="yes"></div>
          </div>
        </div>
      </div>
      <div class="weixin_pay" v-if="zhifubao">
        <div class="weixin">
            <img src="static/images/zhifubao.jpg" alt="" class="weixin_img">
        </div>
        <span>支付宝</span>
        <div class="select">
          <div class="circle" @click="select('nselct')" :class="{isSelect: Tab ==='nselct'}">
            <div class="gou" v-show="yes"></div>
          </div>
        </div>
      </div>
      <div class="button" @click="pay()">确认支付  ￥{{this.price}}</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      weixin: true,
      zhifubao: false,
      title: '',
      description: '',
      photo: '',
      num: '',
      price: '',
      yes: true,
      Tab: 'selct',
      text: this.$store.state.province,
      order_cate: this.$route.params.order_cate,
      objid: this.$route.params.objid,
      price: '',
      notice_url: global.url+'/api/apppaymess',
      typeplay: 1, // 微信支付
      orderid: '',
      imgSrc: global.imgSrc,
      scode: '',
      sid: '',
    }
  },
  created() {
    window.PaytypePaystate = this.PaytypePaystate
  },
  mounted(){
    let weuserid = this.checkLogin()
    this.$http({
        method:'post',
        data:'objid='+this.objid+'&cate_id='+this.order_cate+'&weuserid='+weuserid,
        url:global.url+'/api/order',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res=>{
        this.title       = res.data.data.data.title
        this.description = res.data.data.data.description
        this.photo       = res.data.data.data.photo
        this.num         = res.data.data.data.num
        this.price       = res.data.data.data.price
        this.orderid     = res.data.data.data.order_no
      })
      .catch(e => {
        console.log(e)
      })
  },
  
  methods: {
    select (type) {
      this.Tab = type
    },
    pay(){
        // 获取用户信息
        let weuserid = this.checkLogin()
        this.$http({
          method:'post',
          data:'weuserid='+weuserid+'&type=get_info',
          url: global.url+'/api/user',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res=>{
          let info = res.data.data.data

          // 通过天盛接口获取用户sid
          let open_id    = info.openid
          let head_img   = info.headimg
          let nick_name  = info.nickname
          let sex        = info.sex
          let city       = info.city
          let province   = info.province
          let union_id   = info.unionid
          let appid      = '14936872341446'
          let devkey     = '14915485974028'
          let market_key = 'yulejia'

          let scode=""; 
          for(var i=0;i<10;i++) 
          { 
            scode+=Math.floor(Math.random()*10); 
          } 

          this.$http({
            method:'post',
            url: 'https://api.tscce.cn/api/login/mobile/wechat',
            data:'appid='+appid+'&devkey='+devkey+'&market_key='+market_key+'&scode='+scode+'&open_id='+open_id+'&union_id='+union_id,
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          }).then(res=>{
            let sid   = res.data.data.sid
            let scode = res.data.data.scode
            // 调用支付
            try{
              var data='{"title":"会员申请","price":"1","orderid":"'+this.orderid+'","notice_url":"http://ylj.tscce.cn/index/wxsdk/getPayMess","typeplay":"1","sid":"'+sid+'","scode":"'+scode+'"}';
              window.settings.applypayData(data)
            }catch(e){
              alert(e)
            }
          })
          .catch(e => {
            console.log(e)
          })
        })
        .catch(e => {
          console.log(e)
        })
      
    },
    PaytypePaystate(stauts){
      if (stauts == 1) {
        Toast({
          message: '支付成功',
          position: 'middle',
          duration: 2000
        })
        setTimeout(() => {
          this.$router.go(-2)
        }, 1000)
      }else{
        Toast({
          message: '支付失败',
          position: 'middle',
          duration: 2000
        })
        setTimeout(() => {
          this.$router.go(-2)
        }, 1000)
      }
    },
    goBack(){
      this.$router.go(-2)
    }
  }
}
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.pay {
  margin-top: 1.5rem;
  font-size: 15px;
  margin: 1.5rem .4rem 0 .4rem;
  margin-right: .4rem;
}
.msg {
  display: flex;
  margin-top: .15rem;
}
.msg_pic {
  flex: 1;
}
.msgmap {
  flex: 4;
  display: flex;
  flex-direction: column;
  font-size: 15px;
}
.pic {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.top {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.bottom {
  flex: 1;
}
label:nth-child(2) {
  opacity: .6;
}
.bar {
  width: 100%;
  height: .3rem;
  background-color: #F0F0F0;
  margin-top: .15rem;
}
.paykind {
  width: 100%;
}
.weixin_pay {
  display: flex;
  border-bottom: 1px solid #F0F0F0;
  padding: .2rem 0;
}
.weixin {
  flex: .7;
}
span {
  flex: 4;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.select {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weixin_img {
  width: .8rem;
  border-radius: 4px;
}
.circle {
  width: .5rem;
  height: .5rem;
  border: 1px solid #F0F0F0;
  border-radius: 50%;
}
.button {
  width: 100%;
  height: 1.2rem;
  margin-top: .4rem;
  background-color: #E38C1A;
  border-radius: 4px;
  color: white;
  text-align: center;
  line-height: 1.2rem;
  font-size: 16px;
}
.isSelect {
  background-color: #119DF8;
  border: none;
}
.gou {
  width: .35rem;
  height: .2rem;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  margin-top: .1rem;
  margin-left: .08rem;
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
