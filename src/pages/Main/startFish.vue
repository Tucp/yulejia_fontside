<template lang="html">
  <div class="container">
    <div class="startfish allbg">
      <header-item title="我要约钓"></header-item>
      <div class="group">
        <img src="static/images/time-y.png" alt="" class="imgs">
        <label>什么时候</label>
        <!-- <div ref="sTime" class="sTime"></div>
        <div class="timepick">
          <el-date-picker placeholder="请选择日期" :editable="false" type="datetime" v-model="value1" :picker-options="{minTime: minTime, start: minTime, maxTime: maxTime}" @change="showTime">
          </el-date-picker>
        </div> -->
        <div class="showTime">{{yTime.substring(0,10) + ' ' + yTime.substring(11)}}</div>
        <div class="timepick">
          <input placeholder="请选择日期" @input="ts" v-model="value1" id="pickerr" style="border:0px;" type="datetime-local">
          <label for="pickerr"></label>
        </div>
      </div>
      <div class="group" @click="toDiao()">
        <img src="static/images/location-y.png" alt="" class="imgs">
        <label  ref="place">去哪钓</label>
        <div class="spred"></div>
      </div>
      <div class="bar"></div>
      <div class="other">
        <img src="static/images/money-y.png" alt="" class="img">
        <label class="money">费用</label>
        <div class="content">
          <div class="circle" @click="select('selct')" :class="{isSelect: Tab ==='selct'}">
            <div class="gou" v-show="yes"></div>
          </div> 
          <span>我请客</span>
        </div>
        <div class="content1">
          <div class="circle" @click="select('nselct')" :class="{isSelect: Tab ==='nselct'}">
            <div class="gou" v-show="yes"></div>
          </div>
          <span>AA</span>
        </div>
      </div>
      <div class="group">
        <img src="static/images/tel_1.png" alt="" class="imgs">
        <label>电话号码</label>
        <input type="text" ref="tel" v-model="value2" placeholder="留下你的号码，让钓友联系你吧" readonly="true">
      </div>
      <textarea name="name" rows="8" cols="80" v-model="value3" placeholder="写点约钓介绍吧，介绍越详细越容易引起钓友报名哦"></textarea>
      <div class="addpic">
        <Vupload></Vupload>
      </div>
      <div ref="point" v-show="showPoint" class="point"></div>
    </div>
    <div class="mask">
      <div class="button" @click="refer">发布约钓</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Vupload from '../../components/upload.vue'
import flatpickr from 'flatpickr'
export default {
  components: {
    Vupload
  },
  data() {
    return {
      yes: true,
      Tab: 'selct',
      time: '',
      zuobiao: '',
      cate_id: '1',
      imgSrc: '',
      imgSrcList: 'x',
      showPoint: false,
      value1: '',
      value2: '',
      value3: '',
      maxTime: new Date('2027'),
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  beforeCreate() {
    let weuserid = this.checkLogin(false)
    this.$http({
        method:'post',
        data:'action=add&weuserid='+weuserid,
        url:global.url+'/api/yuediao',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code == '0') {
          this.$router.push('/login')
        }
      })
  },
  mounted() {
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
                  that.value2 = data
                }
            }, 
            function(reason, data){
                console.log('rejected');
                console.log(reason);
            }
        )

    this.value2 = this.tel
    this.value3 = this.content
    flatpickr("#picker", {enableTime: true, altInput: true, minDate: "today", dateFormat: "YYYY-MM-DD HH:MM", defaultDate: "today"})
    this.value1 = this.yTime
    if (this.cityName != '') {
      this.$refs.place.innerHTML = this.cityName
    } else {
      this.$refs.place.innerHTML = '去哪钓'
    }
    
    let weuserid = this.checkLogin(false)
    this.$http({
          method:'post',
          data:'action=get_cate&weuserid='+weuserid,
          url:global.url+'/api/yuediao',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {

      })
  },
  watch: {
    value1: function() {
      this.$store.commit('changeTime', this.value1)
    },
    value2: function() {
      this.$store.commit('changeTel', this.value2)
    },
    value3: function() {
      this.$store.commit('changeContent', this.value3)
    }
  },
  computed: {
    yTime() {
      return this.$store.state.selector.yTime
    },
    tel() {
      return this.$store.state.selector.tel
    },
    content() {
      return this.$store.state.selector.content
    },
    cityName() {
      return this.$store.state.selector.cityName
    },
    longitude() {
      return this.$store.state.selector.longitude
    },
    latitude() {
      return this.$store.state.selector.latitude
    },
    photo() {
      return this.$store.state.photo.photo
    },
    remove() {
      return this.$store.state.photo.remove
    },
    minTime() {
        var y = new Date().getFullYear();
        var m = new Date().getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = new Date().getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = new Date().getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = new Date().getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return y + '/' + m + '/' + d + ' ' + h + ':' + minute
    }
  },
  methods: {
    ts() {
      if(this.value1.substring(0,4) > this.minTime.substring(0,4)) {
        return
      } else if(this.value1.substring(0,4) < this.minTime.substring(0,4)) {
        this.value1 = ''
        this.$store.commit('changeTime', '')
        this.showPoint = true
        this.$refs.point.innerHTML = '选择的时间不能早于当前时间！'
        setTimeout(() => {
          this.showPoint = false
        }, 1000)
      } else if(this.value1.substring(0,4) == this.minTime.substring(0,4)) {
        if(this.value1.substring(5,7) > this.minTime.substring(5,7)) {
          return
        } else if(this.value1.substring(5,7) < this.minTime.substring(5,7)) {
          this.value1 = ''
          this.$store.commit('changeTime', '')
          this.showPoint = true
          this.$refs.point.innerHTML = '选择的时间不能早于当前时间！'
          setTimeout(() => {
            this.showPoint = false
          }, 1000)
        } else if(this.value1.substring(5,7) == this.minTime.substring(5,7)) {
          if(this.value1.substring(8,10) > this.minTime.substring(8,10)) {
            return
          } else if(this.value1.substring(8,10) < this.minTime.substring(8,10)) {
            this.value1 = ''
            this.$store.commit('changeTime', '')
            this.showPoint = true
            this.$refs.point.innerHTML = '选择的时间不能早于当前时间！'
            setTimeout(() => {
              this.showPoint = false
            }, 1000)
          } else if(this.value1.substring(8,10) == this.minTime.substring(8,10)){
            if(this.value1.substring(11,13) > this.minTime.substring(11,13)) {
              return
            } else if(this.value1.substring(11,13) < this.minTime.substring(11,13)) {
              this.value1 = ''
              this.$store.commit('changeTime', '')
              this.showPoint = true
              this.$refs.point.innerHTML = '选择的时间不能早于当前时间！'
              setTimeout(() => {
                this.showPoint = false
              }, 1000)
            } else if(this.value1.substring(11,13) == this.minTime.substring(11,13)) {
              if(this.value1.substring(14) < this.minTime.substring(14)) {
                this.value1 = ''
                this.$store.commit('changeTime', '')
                this.showPoint = true
                this.$refs.point.innerHTML = '选择的时间不能早于当前时间！'
                setTimeout(() => {
                  this.showPoint = false
                }, 1000)
              } else {
                return
              }
            }
          }
        }
      }
    },
    //图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      console.log(file.response);
      this.dialogVisible = true;
    },

    select(type) {
      this.Tab = type
      if (this.Tab === 'selct') {
        this.cate_id = 1
      } else {
        this.cate_id = 2
      }
    },
    hidden() {
      let a = document.querySelector('.tupian')
      a.style.display = 'none'
    },
    refer() {
      console.log(this.value1.replace('T',''))
      if (this.value1 == '') {
        this.showPoint = true
        this.$refs.point.innerHTML = '请选择你要约钓的时间！'
        setTimeout(() => {
          this.showPoint = false
        }, 1000)
      } else if (this.cityName == '') {
        this.showPoint = true
        this.$refs.point.innerHTML = '请选择约钓地址！'
        setTimeout(() => {
          this.showPoint = false
        }, 1000)
      } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.tel))) {
        this.showPoint = true
        this.$refs.point.innerHTML = '请输入正确的手机号码！'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.tel.focus()
        }, 1000)
      } else if (this.content == '') {
        this.showPoint = true
        this.$refs.point.innerHTML = '请输入你的约钓介绍！'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.tel.focus()
        }, 1000)
      } else {
        this.zuobiao = this.longitude + ',' + this.latitude
        let weuserid = this.checkLogin(false)
        this.$http({
          method:'post',
          data:'action=add&time='+this.yTime.substring(0,10) + ' ' + this.yTime.substring(11)+'&zuobiao='+this.zuobiao+'&cate_id='+this.cate_id+'&tel='+this.tel+'&content='+this.content+'&photo='+this.photo+'&remove='+this.remove+'&weuserid='+weuserid,
          url:global.url+'/api/yuediao',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          
            if (res.data.code == '-1') {
              this.showPoint = true
              this.$refs.point.innerHTML = '发布失败'
              setTimeout(() => {
                this.showPoint = false
              }, 1000)
            } else if (res.data.code == '1') {
              this.showPoint = true
              this.$refs.point.innerHTML = '发布成功'
              // this.$store.removeAll()
              setTimeout(() => {
                this.showPoint = false
                this.$router.push('/main/aboutfishing')
              }, 1000)
            } else if (res.data.code == '0') {
              this.showPoint = true
              this.$refs.point.innerHTML = '登录失效'
              setTimeout(() => {
                this.showPoint = false
                this.$router.push('/login')
              }, 1000)
            }
          })
      }
    },
    showImg() {
      for (var i = 0; i < document.querySelector('#fileId1').files.length; i++) {
        // this.imgSrcList.push(window.URL.createObjectURL(document.querySelector('#fileId1').files[i]))
        if (!document.querySelector('#fileId1').files || !document.querySelector('#fileId1').files[0]) {
          return;
        }
        var reader = new FileReader();
        var that = this
        reader.onload = function (evt) {
          that.imgSrcList.push(evt.target.result)
        }
        reader.readAsDataURL(document.querySelector('#fileId1').files[i]);
      }
    },
    toDiao() {
      this.$store.commit('selectLi',document.querySelector('.weui-uploader__files').innerHTML)
      this.$router.push('/select')
    }
  }
}
</script>

<style lang="css" scoped>
/*input[type="datetime-local"]{
   opacity: 0;
   width: 0.8rem;
   height: 0.8rem;
   z-index: 999;
}
input[type="datetime-local"]{
  display: none;
  visibility: hidden;
}
input[type="datetime-local"]{
   display:none;
}
input[type="datetime-local"]{
  font-size: 14.5px;
}*/
/*----------用来移除向下箭头----------*/
/*input[type="datetime-local"]::-webkit-calendar-picker-indicator {
   display: none;
}*/

/*----------用来移除叉叉按钮----------*/
/*input[type="datetime-local"]::-webkit-clear-button{
   display:none;
}

input[type="datetime-local"]::-webkit-inner-spin-button { visibility: hidden; } 
input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper { background-color: #eee; } 
input[type="datetime-local"]::-webkit-datetime-edit-text { color: #4D90FE; padding: 0 .3em; } 
input[type="datetime-local"]::-webkit-datetime-edit-year-field { color: purple; } 
input[type="datetime-local"]::-webkit-datetime-edit-month-field { color: blue; } 
input[type="datetime-local"]::-webkit-datetime-edit-day-field { color: green; } 
input[type="datetime-local"]::-webkit-inner-spin-button { visibility: hidden; } 
input[type="datetime-local"]::-webkit-calendar-picker-indicator { 
border: 1px solid #ccc; 
border-radius: 2px; 
box-shadow: inset 0 1px #fff, 0 1px #eee; 
background-color: #eee; 
background-image: -webkit-linear-gradient(top, #f0f0f0, #e6e6e6); 
color: #666; 
}*/

#picker{
  -web-kit-appearance:none;
  -moz-appearance: none;
  font-size:1.4em;
height:2.7em;
border-radius:4px;
border:1px solid #c8cccf;
color:#6a6f77;
outline:0;
}
#picker::-webkit-calendar-picker-indicator {
   display: none;
}

#picker::-webkit-clear-button{
   display:none;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

.startfish {
  background-color: white;
  font-size: 15px;
  padding: 1.5rem 0 0 0;
}

.startfish .point {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .7);
  color: #fff;
  font-size: 0.373333rem;
  padding: 5px 10px;
  border-radius: 5px;
}

.group {
  position: relative;
  width: 100%;
  line-height: 1.2rem;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
}

.group .sTime {
  position: absolute;
  left: 3rem;
}
.group .showTime{
  flex: 1;
  height: 100%;
  position: absolute;
  right: 1rem;
  left: 2.8rem;
  padding-left: 15px; 
  background-color: #fff;
}
label {
  font-size: 14.5px;
  margin-left: .2rem;
}

.imgs,
.img {
  width: .5rem;
  height: .53rem;
  background-size: cover;
}

.spred {
  position: absolute;
  display: inline-block;
  top: 0;
  right: .4rem;
  width: .35rem;
  height: .35rem;
  transform: rotate(225deg);
  border-bottom: 1px solid #BBBBBB;
  border-left: 1px solid #BBBBBB;
  margin-right: .2rem;
  margin-top: .5rem;
}

.group:nth-of-type(1) .spred.show {
  transform: rotate(315deg);
}

.other {
  width: 100%;
  line-height: 1.2rem;
  border-bottom: 1px solid #F0F0F0;
  display: flex;
  align-items: center;
  padding: 0 .4rem 0 .4rem;
}

.timepick {
  height: 100%;
  line-height: 100%;
}
.timepick label{
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
}
.timepick label:after{
  content: '';
  display: inline-block;
  position: absolute;
  top: 50%;
  right: .6rem;
  margin-top: -.175rem;
  display: inline-block;
  height: .35rem;
  width: .35rem;
  -webkit-transform: rotate(225deg);
  transform: rotate(225deg);
  border-bottom: 1px solid #BBBBBB;
  border-left: 1px solid #BBBBBB;
}

.content,
.content1 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.money {
  margin-left: .2rem;
  margin-right: 2.3rem;
}

.content1 {
  margin-left: .8rem;
}

input {
  margin-left: .3rem;
  width: 70%;
}

.circle {
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
  margin-right: .2rem;
  border: 1px solid #EFEFEF;
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

.isSelect {
  background-color: #FCAC0D;
  border: none;
}

textarea {
  width: 100%;
  border: none;
  height: 5rem;
  padding: .3rem .4rem 0 .4rem;
  opacity: .5;
}

.addpic {
  width: 100%;
  margin-top: .5rem;
  /*display: flex;*/
  overflow: hidden;
  flex-wrap: wrap;
}

.weui-cell {
  padding: 0 !important;
}

.pic,
.tupian {
  position: relative;
  width: 31%;
  height: 2.5rem;
  text-align: center;
  line-height: 3rem;
  border: 2px solid #F0F0F0;
  margin-right: .2rem;
  overflow: hidden;
}

.pic {
  opacity: .4;
}

.pic::after {
  content: '';
  position: absolute;
  top: 1.2rem;
  right: 10%;
  width: 80%;
  height: .1rem;
  background-color: #DCDDDD;
}

.pic::before {
  content: '';
  position: absolute;
  left: 1.3rem;
  top: 10%;
  width: .1rem;
  height: 80%;
  background-color: #DCDDDD;
}

.button {
  margin-top: .5rem;
  width: 91.5%;
  height: 1.5rem;
  background-color: #FCAC0D;
  border-radius: 3px;
  text-align: center;
  line-height: 1.5rem;
  font-size: 18px;
  color: white;
  margin-left: .4rem;
  margin-bottom: 0.266667rem;
}

.hhh {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.span {
  position: absolute;
  width: .5rem;
  height: .5rem;
  top: 0;
  right: 0;
  background-color: #646F73;
  color: white;
  border-radius: 3px;
  line-height: .5rem;
}

.bar {
  width: 100%;
  height: .3rem;
  background-color: #F0F0F0;
}
</style>
