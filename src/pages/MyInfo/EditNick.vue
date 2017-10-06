<template lang="html">
  <div class="editnick header-item allbg">
    <header-item title="修改昵称"></header-item>
    <input type="text" v-model="nickname" placeholder="请输入您要修改的昵称" ref="nickname">
    <div class="edit">
      <p class="tip">4-30个字符，支持中英文、数字</p>
      <button @click="confirm">确定</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      nickname : '',
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
          this.nickname = res.data.data.data.nickname
        }
      })
  },
  methods: {
    confirm() {
      if(this.nickname == ''){
        Toast({
              message: '昵称不能为空',
              position: 'middle',
              duration: 1500
            })
        return false
      }
      let that = this
      let weuserid = this.checkLogin()
      this.$http({
          method:'post',
          data:'type=edit&nickname='+this.nickname+'&weuserid='+weuserid,
          url:global.url+'/api/user',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
          if (res.data.code === 1) {
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
  }
}
</script>

<style lang="css" scoped>
.editnick {
  overflow: hidden;
  background-color: #f0f0f0;
}

.editnick::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -999;
  background-color: #f0f0f0;
}

input {
  margin-top: .296296296rem;
  width: 100%;
  height: 1.24074074rem;
  padding-left: .407407407rem;
  font-size: 14px;  
}

.edit {
  padding: 0 .407407407rem;
  margin-top: .259259259rem;
  background-color: #f0f0f0;
}

.tip {
  font-size: .314814815rem;
  color: #b5b5b6;
  margin-bottom: 1.07407407rem;
}

button {
  width: 100%;
  height: 1.11111111rem;
  color: #fff;
  background-color: #119df8;
  border: 0;
  font-size: .44444444rem;
  border-radius: 5px;
}
</style>
