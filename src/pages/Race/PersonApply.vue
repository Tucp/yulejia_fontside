<template lang="html">
  <div class="personapply header-item">
    <header-item title="个人赛事报名"></header-item>
    <div class="title">
      <div class="img">
        <img v-lazy="imgSrc + race.photo[0]">
      </div>
      <div class="text">
        <p>{{race.title}}</p>
        <p><span>比赛时间：</span>{{race.race_begin}} - {{race.race_end}}</p>
      </div>
    </div>
    <div class="information">
      <div class="user">
        <div class="block">
          <div class="item">
            <span>姓&nbsp&nbsp名</span>
            <input ref="name" type="text" maxlength="18" placeholder="您的姓名" v-model="name">
          </div>
          <div class="item">
            <span>电&nbsp&nbsp话</span>
            <input ref="tel" type="text" maxlength="18" placeholder="您的电话" v-model="tel" readonly= "true ">
          </div>
          <div class="item">
            <span>身份证号码</span>
            <input ref="idCard" type="text" maxlength="18" placeholder="您的身份证号码" v-model="idCard">
          </div>
        </div>
        <div class="price item">
          <div>
            <p>共 1 人<span class="">费用：</span><span class="char">￥</span><span class="money">{{race.person_price}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <button @click="flag && submit()">
        {{text}}
      </button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      objid : this.$route.params.id,
      title : '',
      race : {},
      signup : {},
      name : '',
      tel : '',
      idCard : '',
      text: "立即支付",
      is_pay: '',
      flag: 1,
      imgSrc: global.imgSrc
    }
  },
  mounted () {
    let that = this 
    this.checkPhone()
        .then(
            function(data){
                // 成功获取的回调
                if (!data) {
                  Toast({
                      message: '请先绑定手机',
                      position: 'middle',
                      duration: 2000
                    })
                    setTimeout(function () {
                      that.$router.push({
                        path: '/set/bind',
                      })
                    }, 2100)
                }else{
                  that.tel = data
                }
            }, 
            function(reason, data){
                console.log('rejected');
                console.log(reason);
            }
        )

    let weuserid = this.checkLogin()
    this.$http({
        method:'post',
        data:'id='+this.objid+'&weuserid='+weuserid,
        url:global.url+'/api/race',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res.data.data)
          that.race = res.data.data.data
          that.signup = res.data.data.signup

          if (res.data.data.signup.detail) {
            that.name = res.data.data.signup.detail.name
            that.tel = res.data.data.signup.detail.tel
            that.idCard = res.data.data.signup.detail.idcard
            that.is_pay = res.data.data.signup.detail.is_pay

            switch(that.is_pay){
                case 1:
                  that.text = '已报名'
                  that.flag = 0
                  break;
                case -1:
                  that.text = '登录报名'
                  break;
                case 0:
                  that.text = '继续支付'
                  break;
                default:
                  that.text = '报名比赛'
                  break;
            }

          }
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    submit() {
      switch (this.is_pay){
        case -1:
          this.$router.push({
            name: 'login'
          })
          break;

        case 0:
          this.$router.push({
            name: 'pay', params: { order_cate: this.signup.id, objid:this.objid}
          })
          break;

        default:
          if(this.name == '') {
          Toast({
            message: '请填写你的姓名',
            position: 'middle',
            duration: 2000
          })
        } else if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel))) {
          Toast({
            message: '请输入正确的手机号码',
            position: 'middle',
            duration: 2000
          })
        } else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idCard))) {
          Toast({
            message: '请输入正确的身份证号码',
            position: 'middle',
            duration: 2000
          })
        } else{
          let weuserid = this.checkLogin()
          this.$http({
              method:'post',
              data:'objid='+this.objid+'&action=add&cate_id='+this.signup.id+'&name='+this.name+'&tel='+this.tel+'&title='+this.name+'&description='+this.name+'&idcard='+this.idCard+'&photo='+this.race.photo[0]+'&weuserid='+weuserid,
              url:global.url+'/api/order',
              header: {  
                "Content-Type": "application/x-www-form-urlencoded"  
              },  
            }).then(res=>{
              if(res.data.code == -1) {
                this.$router.push({
                  name: 'pay', params: { order_cate: this.signup.id, objid:this.objid}
                })
              } else if(res.data.code == 1) {
                this.$router.push({
                  name: 'pay', params: { order_cate: this.signup.id, objid:this.objid}
                })
              } else {
                this.showPoint = true
                this.$refs.point.innerHTML = res.data.msg
                setTimeout(() => {
                  this.showPoint = false
                  this.$router.push('/login')
                }, 1000)
              }
            })
            .catch(e => {
              console.log(e)
            })
        }
      }
        
    },
    select (type) {
      this.Tab = type
    },
  }
}
</script>

<style lang="css" scoped>
.personapply:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f0f0f0;
  z-index: -999;
}
.personapply .title {
  padding: .277777778rem .44444444rem;
  position: relative;
  border-bottom: .277777778rem solid #f0f0f0;
  background-color: #fff;
}
.personapply .title div {
  float: left;
}
.personapply .title .img {
  width: 2.73148148rem;
  height: 2.08333333rem;
  overflow: hidden;
  margin-right: .44444444rem;
}
.personapply .title img {
  width: 100%;
  height: 100%;
}
.personapply .text {
  width: 5.5rem;
  height: 2.10333333rem;
  position: relative;
}
.personapply .text p:first-child {
  font-size: 14px;
  height: 70%;
}
.personapply .text p:last-child {
  position: absolute;
  bottom: 0;
}
.personapply .text p:last-child span {
  color: #898989;
}
.personapply .user {
  background-color: #fff;
}
.personapply .item {
  height: 1.277777778rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.personapply .block {
  padding: 0 .44444444rem;
}
.personapply .user div:not(:first-child) {
  border-top: 1px solid #f0f0f0;
}
.personapply .item span {
  width: 2.277777778rem;
}
.personapply .item input {
  color: #898989;
}
.personapply .price > div {
  position: absolute;
  right: .44444444rem;
}
.personapply .price span:first-child {
  margin-left: .44444444rem;
}
.personapply .price span {
  color: rgb(246,70,72);
}
.personapply .price .char {
  font-size: 12px;
  transform: scale(.5);
}
.personapply .price .money {
  font-size: 16px;
}
.personapply .btn {
  padding: 0 .44444444rem;
  margin-top: .340740741rem;
  margin-bottom: .740740741rem;
}
.personapply .btn button {
  width: 100%;
  height: 1.14285714rem;
  border: 0;
  background-color: rgb(243,152,0);
  color: #fff;
  /*border-radius: 5px;*/
}
</style>
