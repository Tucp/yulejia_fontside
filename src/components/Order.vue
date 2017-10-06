<template lang="html">
  <div class="container">
    <div class="order" @click="go">
      <img src="static/images/message.png" alt="">
      <p>我的消息</p>
      <i v-show="this.comments !== 0"></i>
    </div>
    <div class="blank"></div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        comments: {}
      }
    },
    mounted() {
      this.$http({
        method: 'post',
        data: 'type=message',
        url: global.url+'/api/user',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then(res => {
        if (res.data.code === 1) {
          this.comments = res.data.data.comments
        }
      })
    },
    methods: {
      show() {
        Toast({
          message: '开发中...',
          position: 'middle',
          duration: 1500
        })
      },
      go() {
        this.$router.push('/message')
      }
    }
  }

</script>

<style lang="css" scoped>
  .order {
    position: relative;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    width: 100%;
    line-height: 1.24074074rem;
    padding-left: .407407407rem;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;
  }

  .blank {
    height: .3240740741rem;
    background-color: #f0f0f0;
  }

  img {
    width: .56296296rem;
    height: .56296296rem;
  }

  .order p {
    font-size: .37037037rem;
    margin-left: .277777778rem;
  }

  .blank {
    height: .3240740741rem;
    background-color: #F0F0F0;
  }
  i{
    position: absolute;
    right: .416rem;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 6px;
    height: 6px;
    background-color: red;
    border-radius: 50%;
  }
</style>