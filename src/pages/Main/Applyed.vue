<template lang="html">
  <div class="applyed header-item allbg">
    <header-item title="已报名的钓友"></header-item>
    <div>
      <div class="item" v-for="item in sign"
       :key="item.id" @click="displayDetail(item.id)">
        <div class="avatar">
          <img v-lazy="item.photo" class="avatarimg">
          <img src="static/images/female.jpg" class="sex">
        </div>
        <div class="info">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="out">
      <button @click="cancelApply" v-if="this.$store.getters.sign === true">
        取消报名
      </button>
      <button v-else @click="Apply">
        我要报名
      </button>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data () {
    return {
      sign: []
    }
  },
  mounted () {
    let id = this.$route.params.id
    let weuserid = this.checkLogin()
    this.$http({
        method:'post',
        data:'id='+id+'&weuserid='+weuserid,
        url:global.url+'/api/yuediao',
        header: {  
          "Content-Type": "application/x-www-form-urlencoded"  
        },  
      }).then(res => {
        if (res.data.code === 1) {
          this.sign = res.data.data.sign
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
      Apply () {
        this.$nextTick(function(){
          let id = this.$route.params.id
          let weuserid = this.checkLogin(false)
          this.$http({
            method:'post',
            data:'id='+id+'&weuserid='+weuserid,
            url:global.url+'/api/yuediao',
            header: {  
              "Content-Type": "application/x-www-form-urlencoded"  
            },  
          }).then(res => {
              this.$store.commit('sign', res.data.data.is_sign)
              if (res.data.code === 1) {
                this.sign = res.data.data.sign
              }
            })
            .catch(e => {
              console.log(e)
            })
          });
        let id = this.$route.params.id

        this.$http({
          method:'post',
          data:'objid='+id+'&action=sign',
          url:global.url+'/api/yuediao',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
            console.log(res)
            if (res.data.code === 1) {
            }
            if (res.data.code === 0) {
              this.$router.push('/login')
            }
          })
      },
      displayDetail (id) {
        this.$router.push({
          name: 'person', params: { id: id }
        })
      },
      cancelApply () {
        let id = this.$route.params.id
        let weuserid = this.checkLogin(false)
        this.$http({
          method:'post',
          data:'objid='+id+'&action=sign&weuserid='+weuserid,
          url:global.url+'/api/yuediao',
          header: {  
            "Content-Type": "application/x-www-form-urlencoded"  
          },  
        }).then(res => {
            if (res.data.code === 0) {
              alert('请先登录')
              this.$router.push('/login')
            }
            if (res.data.code === 1) {
              Toast({
                message: '取消成功',
                position: 'middle',
                duration: 500
              })
              setTimeout(() => {
                this.$router.go(-1)
              }, 800)
            }
          })
      }
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
  background-color: #fff;
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
  font-size: 14px;
}
.out {
  padding: .407407407rem;
  background-color: #f0f0f0;
}
.out button {
  height: 1.11111111rem;
  width: 100%;
  background-color: rgb(243,152,0);
  border: 0;
  color: #fff;
  font-size: 16px;
}
</style>
