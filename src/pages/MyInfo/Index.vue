<template lang="html">
  <div class="info header-item">
    <header-item title="我的资料" path="/my"></header-item>
    <div class="comtainer">
      <div class="infolist">
              <router-link to="/editavatar">
                <div class="avatar_msg">
                  <p>头像</p>
                  <img :src="isClick ? 'static/images/0.gif' : avatar " v-if="avatar.indexOf('http')>=0">
                  <img :src="imgSrc+avatar" v-else>
                  <i></i>
                </div>
              </router-link>
              <router-link to="/editnick">
                <div class="cell-item">
                  <p>昵称</p>
                  <p>{{text}}</p>
                  <i></i>
                </div>
              </router-link>
              <div class="cell-item" @click="show">
                <p>性别</p>
                <p>{{sex}}</p>
                <i></i>
              </div>
              <!-- <div class="cell-item">
                <p>鱼龄</p>
                <p>{{num}}</p>
                <i></i>
              </div> -->
              <div class="mask" v-show="isShow" @click="hidden"></div>
              <div class="select" v-show="isShow">
                <div class="header" >
                  <div class="dl" @click="hidden">取消</div>
                  <div class="dc">请选择性别</div>
                  <div class="dr" @click="confirm">完成</div>
                </div>
                <div style="text-align:center;">
                  <span v-bind:class="classObject1" class="sex_select" style="color:#119df8;" @click="select_sex('1')">♂</span>
                  <span v-bind:class="classObject2" class="sex_select" style="color:pink;" @click="select_sex('2')">♀</span>
                  <!-- <select class="sex">
                    <option>男</option>
                    <option>女</option>
                  </select> -->
                  <!-- <div class="sex" @click="select($event)" v-show="isSelect">男</div>
                  <div class="active sex" ref="sex">女</div>
                  <div class="sex" @click="select($event)" v-show="!isSelect">女</div> -->
                </div>
              </div>
      </div>
    </div>
      
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      classObject1:{
        select_active: false,
      },
      classObject2:{
        select_active: false,
      },

      isShow: false,
      item: '',
      isSelect: true,
      text: '',
      isClick: true,
      num: '',
      imgSrc: global.imgSrc,
      sexvalue: 0,
      sex: '未知',
    }
  },
  computed: {
    avatar() {
      return this.$store.state.touImg.avatar
    }
  },
  methods: {
    select_sex(sex){
      if (sex == 1) {
        this.sexvalue = 1
        this.classObject1.select_active = true
        this.classObject2.select_active = false
      }
      if (sex == 2) {
        this.sexvalue = 2
        this.classObject2.select_active = true

        this.classObject1.select_active = false
      }
      
    },
    hidden () {
      this.isShow = false
    },
    show () {
      this.isShow = true
    },
    select (e) {
      this.isSelect = !this.isSelect
      this.$refs.sex.innerText = e.currentTarget.innerText
    },
    confirm () {
      this.hidden()
      if(this.sexvalue == 0){
        Toast({
              message: '未选择性别',
              position: 'middle',
              duration: 1500
            })
        return false
      }
      let that = this
      let weuserid = this.checkLogin()
      this.$http({
          method:'post',
          data:'type=edit&sex='+this.sexvalue+'&weuserid='+weuserid,
          url:global.url+'/api/user',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          if (res.data.code === 1) {
            if (this.sexvalue == 1) {
              this.sex = '男'
            }else if(this.sexvalue == 2){
              this.sex = '女'
            }else{
              this.sex = '未知'
            }
            
            Toast({
              message: '修改成功',
              position: 'middle',
              duration: 1500
            });
            let that = this
            setTimeout(function () {
              that.$router.push('/myinfo')
            }, 1800);
          }else{
            Toast({
              message: '登录失效',
              position: 'middle',
              duration: 1500
            });
            
            setTimeout(function () {
              that.$router.push('/login')
            }, 1800);
          }
        })
    }
  },
  mounted () {
      let weuserid = this.checkLogin()
      this.$http({
        method:'post',
        data:'weuserid='+weuserid,
        url:global.url+'/api/user',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {

          this.text = res.data.data.data.nickname

          if (res.data.data.data.sex == 1) {
              this.sex = '男'
            }else if(res.data.data.data.sex == 2){
              this.sex = '女'
            }else{
              this.sex = '未知'
            }

          this.$store.commit('selectAvatar', res.data.data.data.headimg)
          this.isClick = false
          this.num = '3年'
        } else {
          this.text = '请先登录'
          this.num = '请先登录'
        }
      })
  }
}
</script>

<style lang="css" scoped>
.select_active{
  font-weight: bold;
}
.sex_select{
  font-size: 35px;
  margin: 50px;
  width: 50px;
  height: 50px;
  padding-top: 20px;
}
.infolist .main {
  padding: .6rem 0;
}
.infolist .sex {
  font-size: 16px;
  height: 1.259259259rem;
  text-align: center;
  line-height: 1.259259259rem;
  color: #898989;
  width: 100%;
  /*margin-bottom: 1.259259259rem;*/
}
.infolist .active {
  position: absolute;
  top: 3.2rem;
  border-top: 1px solid #dcdddd;
  border-bottom: 1px solid #dcdddd;
  color: #000;
}
.infolist .mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #000;
  opacity: .5;
  z-index: 999;
}
.infolist .select {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3.17037037rem;
  background-color: #fff;
  z-index: 9999;
}
.infolist .select .header {
  height: 1.33333333rem;
  border-bottom: 1px solid #dcdddd;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: 0 .46296296rem;
  text-align: center;
}
.infolist .select .dl, .dr {
  font-size: 14px;
}
.infolist .select .dl {
  color: #898989;
}
.infolist .select .dc {
  font-size: 16px;
  text-align: center;
  flex: 1;
  /*font-weight: bold;*/
}
.infolist .select .dr {
  color: #119df8;
}
.avatar_msg {
  height: 1.824074074rem;
  font-size: .44444444rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: 0 .407407407rem;
}
.avatar_msg p {
  flex: 1;
}
.avatar_msg img {
  height: 1.2962963rem;
  width: 1.2962963rem;
  border-radius: 50%;
  margin-right: .285195185rem;
}
.infolist i {
  border-top: .0462962963rem solid #9b9b9c;
  border-right: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(45deg);
}
.cell-item {
  padding: 0 .407407407rem;
  border-top: 1px solid #f0f0f0;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  font-size: .44444444rem;
  height: 1.27777778rem;
}
.cell-item p:first-child {
  flex: 1;
}
.cell-item p:not(:first-child) {
  margin-right: .285195185rem;
  color: #9b9b9c;
}
.infolist {
  margin-top: .277777778rem;
  background-color: #fff;
}
.comtainer {
  margin-top: 1.3rem;
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f0f0f0;
}
</style>
