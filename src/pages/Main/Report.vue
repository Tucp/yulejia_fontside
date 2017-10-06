<template lang="html">
  <div class="aboutfishingreport header-item allbg">
    <header-item title="约钓举报"></header-item>
    <div class="report_info">
      <div class="info-item" v-for="item in datas" :key="item.id">
        <p>{{item.content}}</p>
        <div @click="select($event)" ref="div">
          <i></i>
        </div>
      </div>
      <div class="other">
        <p><span>其他</span>请下面填写投诉意见</p>
        <textarea name="name" rows="6" cols="80" ref="textarea"></textarea>
      </div>
      <div class="btn">
        <button @click="report">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      datas: [],
      content: [],
      disabled: true
    }
  },
  methods: {
    select (e) {
      e.currentTarget.classList.toggle('active')
    },
    report () {
      let weuserid = this.checkLogin()
      let divs = this.$refs.div
      let value = this.$refs.textarea.value.trim()
      divs.forEach(div => {
        if (div.classList.contains('active')) {
          let type = div.previousSibling.previousSibling.innerText.trim()
          if (type !== '') {
            this.content.push(div.previousSibling.previousSibling.innerText.trim())
          }         
        }
      })
      if (value !== '') {
        this.content.push(value)
      }
      if (this.content === '') {
        Toast({
          message: '请选择你要举报的内容',
          position: 'middle',
          duration: 1500
        })
      }
        
      this.$http({
          method:'post',
          data:'action=add&objid='+this.$route.params.objid+'&cate_id='+this.$route.params.cateid+'&content='+this.content+'&weuserid='+weuserid,
          url:global.url+'/api/jubao',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          if (res.data.code === -1) {
            Toast({
              message: '请选择你要举报的内容',
              position: 'middle',
              duration: 1500
            })
          }
          if (res.data.code === 1) {
            Toast({
              message: '举报成功',
              position: 'middle',
              duration: 1500
            })
            setTimeout(() => {
              this.$router.go(-1)
            }, 2000)
          }
          if (res.data.code === 2) {
            Toast({
              message: '你已经举报过了',
              position: 'middle',
              duration: 1500
            })
          }
        })
        .catch(e => {
          console.log(e)
        })  
    }
  },
  mounted () {
    this.$http({
        method:'post',
        url:global.url+'/api/jubao',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {
          this.datas = res.data.data
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.info-item {
  height: 1.31481481rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 .44444444rem;
  background-color: #fff;
}
.info-item p {
  flex: 1;
  font-size: 14px;
  color: #3e3a39;
}
.info-item div {
  width: .537037037rem;
  height: .537037037rem;
  border: 1px solid rgb(220,221,221);
  border-radius: 50%;
  position: relative;
}
.info-item div.active {
  background-color: #FCAC0D;
  border: 0;
}
.info-item i {
  width: .3rem;
  height: .15rem;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg);
  position: absolute;
  top: 25%;
  left: 25%;
  margin-left: -.075rem;
}
.aboutfishingreport .other  {
  padding: .277777778rem .44444444rem;
  font-size: 14px;
  background-color: #fff;
}
.aboutfishingreport .other span{
  margin-right: .27777778rem;
  color: #3e3a39;
  font-size: 14px;
}
.aboutfishingreport .other p {
  color: #3e3a39;
  font-size: 12px;
  opacity: .6;
}
.aboutfishingreport textarea {
  border: 0;
  width: 100%;
  resize: none;
  padding-top: .277777778rem;
}
.aboutfishingreport .btn {
  padding: 0 .407407407rem;   
  background-color: #f0f0f0;
  overflow: hidden;
}
.aboutfishingreport .btn button {
  margin-top: .5rem;
  height: 1.11111111rem;
  width: 100%;
  background-color: #FCAC0D;
  border: 0;
  color: #fff;
  font-size: 16px;
}
</style>
